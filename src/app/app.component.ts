import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';

interface NavLink {
  label: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule],
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="app-shell">
      <mat-sidenav #drawer class="app-sidenav" mode="over" [autoFocus]="false">
        <mat-nav-list>
          <a mat-list-item *ngFor="let link of navLinks" [routerLink]="link.route" (click)="drawer.close()">
            {{ link.label }}
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="app-toolbar">
          <button mat-icon-button class="menu-button" (click)="drawer.toggle()" aria-label="Abrir menú de navegación">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="app-title">Mi App</span>
          <span class="spacer"></span>
          <nav class="nav-links">
            <a mat-button *ngFor="let link of navLinks" [routerLink]="link.route">{{ link.label }}</a>
          </nav>
        </mat-toolbar>

        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
    :host {
      display: block;
      height: 100vh;
    }

    .app-shell {
      height: 100%;
    }

    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 2;
    }

    .menu-button {
      margin-right: 8px;
    }

    .app-title {
      font-weight: 600;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-links {
      display: none;
      gap: 8px;
    }

    .container {
      padding: 16px;
    }

    @media (min-width: 768px) {
      .menu-button {
        display: none;
      }

      .nav-links {
        display: flex;
      }

      .app-sidenav {
        display: none;
      }
    }
    `
  ]
})
export class AppComponent {
  readonly navLinks: NavLink[] = [
    { label: 'Personas', route: '/personas' },
    { label: 'Servicios', route: '/servicios' },
    { label: 'Órdenes', route: '/ordenes' },
    { label: 'Comentarios', route: '/comentarios' }
  ];
}
