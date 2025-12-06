import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Orden { id?: number; detalle: string; email: string; }

@Injectable({ providedIn: 'root' })
export class OrdenesService {
  private base = `${environment.apiBaseUrl}/ordenes`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Orden[]> { return this.http.get<Orden[]>(this.base); }
  getById(id: number): Observable<Orden> { return this.http.get<Orden>(`${this.base}/${id}`); }
  create(o: Orden): Observable<Orden> { return this.http.post<Orden>(this.base, o); }
  update(id: number, o: Orden): Observable<void> { return this.http.put<void>(`${this.base}/${id}`, o); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}