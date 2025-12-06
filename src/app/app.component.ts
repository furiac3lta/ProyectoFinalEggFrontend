import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>Mi App</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/personas">Personas</a>
      <a mat-button routerLink="/servicios">Servicios</a>
      <a mat-button routerLink="/ordenes">Órdenes</a>
      <a mat-button routerLink="/comentarios">Comentarios</a>
    </mat-toolbar>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`.container{ padding: 16px; } .spacer{ flex: 1 1 auto; }`]
})
export class AppComponent {}