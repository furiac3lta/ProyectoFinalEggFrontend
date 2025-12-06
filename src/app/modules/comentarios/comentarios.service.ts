import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Comentario { id?: number; opinion: string; experiencia?: string; }

@Injectable({ providedIn: 'root' })
export class ComentariosService {
  private base = `${environment.apiBaseUrl}/comentarios`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Comentario[]> { return this.http.get<Comentario[]>(this.base); }
  getById(id: number): Observable<Comentario> { return this.http.get<Comentario>(`${this.base}/${id}`); }
  create(c: Comentario): Observable<Comentario> { return this.http.post<Comentario>(this.base, c); }
  update(id: number, c: Comentario): Observable<void> { return this.http.put<void>(`${this.base}/${id}`, c); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.base}/${id}`); }
}