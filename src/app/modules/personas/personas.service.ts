import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Persona { id?: number; nombre: string; apellido: string; email: string; rol?: string; telefono?: string; }

@Injectable({ providedIn: 'root' })
export class PersonasService {
  private base = `${environment.apiBaseUrl}/personas`;
  constructor(private http: HttpClient) {}
    getAll(): Observable<Persona[]> { return this.http.get<Persona[]>(this.base); }
    getById(id: number): Observable<Persona> { return this.http.get<Persona>(`${this.base}/${id}`); }
    create(p: Persona): Observable<Persona> { return this.http.post<Persona>(this.base, p); }
    update(id: number, p: Persona): Observable<void> { return this.http.put<void>(`${this.base}/${id}`, p); }
    delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}