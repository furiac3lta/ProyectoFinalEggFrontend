import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ComentariosService, Comentario } from './comentarios.service';
import { AuthService } from '../../core/auth/auth.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog.component';

@Component({
  standalone: true,
  selector: 'app-comentario-list',
  imports: [CommonModule, MatListModule, MatButtonModule, RouterModule, MatDialogModule],
  template: `
    <h2>Comentarios</h2>
    <mat-list>
      <mat-list-item *ngFor="let c of comentarios">
        <div matListItemTitle>{{ c.opinion }}</div>
        <div matListItemLine>{{ c.experiencia }}</div>
        <a mat-button color="accent" [routerLink]="['/comentarios', c.id, 'editar']" *ngIf="c.id">Editar</a>
        <button mat-button color="warn" (click)="delete(c.id)" *ngIf="isAdmin">Eliminar</button>
      </mat-list-item>
    </mat-list>
    <a mat-raised-button color="primary" routerLink="/comentarios/nuevo">Agregar comentario</a>
  `
})
export class ComentarioListComponent implements OnInit {
  comentarios: Comentario[] = [];
  constructor(private service: ComentariosService, private auth: AuthService, private dialog: MatDialog) {}
  ngOnInit(): void { this.service.getAll().subscribe(res => this.comentarios = res); }

  delete(id?: number): void {
    if (!this.isAdmin || id === undefined) { return; }
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { message: '¿Eliminar comentario?' } });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) { return; }
      this.service.delete(id!).subscribe(() => {
        this.comentarios = this.comentarios.filter(c => c.id !== id);
      });
    });
  }

  get isAdmin(): boolean {
    return this.auth.role === 'ADMIN';
  }
}