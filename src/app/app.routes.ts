import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login.component';
import { PersonasListComponent } from './modules/personas/personas-list.component';
import { PersonaFormComponent } from './modules/personas/persona-form.component';
import { ServiciosListComponent } from './modules/servicios/servicios-list.component';
import { ServicioFormComponent } from './modules/servicios/servicio-form.component';
import { OrdenListComponent } from './modules/ordenes/orden-list.component';
import { OrdenFormComponent } from './modules/ordenes/orden-form.component';
import { ComentarioListComponent } from './modules/comentarios/comentario-list.component';
import { ComentarioFormComponent } from './modules/comentarios/comentario-form.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'personas', component: PersonasListComponent, canActivate: [AuthGuard] },
  { path: 'personas/nuevo', component: PersonaFormComponent, canActivate: [AuthGuard] },
  { path: 'personas/:id/editar', component: PersonaFormComponent, canActivate: [AuthGuard] },
  { path: 'servicios', component: ServiciosListComponent, canActivate: [AuthGuard] },
  { path: 'servicios/nuevo', component: ServicioFormComponent, canActivate: [AuthGuard] },
  { path: 'servicios/:id/editar', component: ServicioFormComponent, canActivate: [AuthGuard] },
  { path: 'ordenes', component: OrdenListComponent, canActivate: [AuthGuard] },
  { path: 'ordenes/nueva', component: OrdenFormComponent, canActivate: [AuthGuard] },
  { path: 'ordenes/:id/editar', component: OrdenFormComponent, canActivate: [AuthGuard] },
  { path: 'comentarios', component: ComentarioListComponent, canActivate: [AuthGuard] },
  { path: 'comentarios/nuevo', component: ComentarioFormComponent, canActivate: [AuthGuard] },
  { path: 'comentarios/:id/editar', component: ComentarioFormComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'personas', pathMatch: 'full' }
];