import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface LoginResp { token?: string; accessToken?: string; role?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _tokenKey = 'app_token';
  private _roleKey = 'app_role';

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Login against backend. Accepts responses like { token } or { accessToken }.
   * Stores token and role (tries to decode role from token if backend doesn't return it).
   */
  login(username: string, password: string): Promise<LoginResp> {
    return this.http.post<LoginResp>(`${environment.apiBaseUrl}/auth/login`, { username, password })
      .pipe(tap(res => this.storeTokenResponse(res)))
      .toPromise();
  }

  private storeTokenResponse(res: LoginResp): void {
    const token = res.token || res.accessToken || null;
    if (token) {
      localStorage.setItem(this._tokenKey, token);
      // if backend returned role explicitly, store it; otherwise try to decode from token
      if (res.role) {
        localStorage.setItem(this._roleKey, res.role);
      } else {
        const decodedRole = this.decodeRoleFromToken(token);
        if (decodedRole) { localStorage.setItem(this._roleKey, decodedRole); }
      }
    }
  }

  logout(): void {
    localStorage.removeItem(this._tokenKey);
    localStorage.removeItem(this._roleKey);
    this.router.navigate(['/login']);
  }

  get token(): string | null { return localStorage.getItem(this._tokenKey); }
  get role(): string | null { return localStorage.getItem(this._roleKey); }
  get isAuthenticated(): boolean { return !!this.token; }

  private decodeRoleFromToken(token: string): string | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) { return null; }
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(atob(payload).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const obj = JSON.parse(json);
      // common claim names: role, roles, authority, authorities
      if (obj.role) return typeof obj.role === 'string' ? obj.role : (Array.isArray(obj.role) ? obj.role[0] : null);
      if (obj.roles) return Array.isArray(obj.roles) ? obj.roles[0] : (typeof obj.roles === 'string' ? obj.roles : null);
      if (obj.authorities) return Array.isArray(obj.authorities) ? obj.authorities[0] : null;
      if (obj.scope) return typeof obj.scope === 'string' ? obj.scope : null;
      return null;
    } catch (e) {
      return null;
    }
  }
}