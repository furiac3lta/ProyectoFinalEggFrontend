import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  selector: 'app-login',
  template: `
    <mat-card>
      <h2>Iniciar sesión</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Usuario</mat-label>
          <input matInput formControlName="username">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Contraseña</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
        <div class="actions">
          <button mat-raised-button color="primary" [disabled]="form.invalid">Entrar</button>
        </div>
      </form>
    </mat-card>
  `,
  styles: [`.full-width{width:100%}.actions{display:flex;justify-content:flex-end;margin-top:12px}`]
})
export class LoginComponent {
  form = this.fb.group({ username: ['', Validators.required], password: ['', Validators.required] });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
  submit(): void {
    const v = this.form.value;
    this.auth.login(v.username, v.password).then(() => this.router.navigate(['/']));
  }
}