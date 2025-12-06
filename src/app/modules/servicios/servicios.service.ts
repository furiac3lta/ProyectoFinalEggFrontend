import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Servicio { id?: number; tipo: string; detalle: string; }

@Injectable({ providedIn: 'root' })
export class ServiciosService {
  private base = `${environment.apiBaseUrl}/servicios`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Servicio[]> { return this.http.get<Servicio[]>(this.base); }
  getById(id: number): Observable<Servicio> { return this.http.get<Servicio>(`${this.base}/${id}`); }
  create(s: Servicio): Observable<Servicio> { return this.http.post<Servicio>(this.base, s); }
  update(id: number, s: Servicio): Observable<void> { return this.http.put<void>(`${this.base}/${id}`, s); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}