import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  vista: 'login' | 'registro' | 'perfil' = 'login';
  usuario: { nombre: string; correo: string } | null = null;
  cantidadFavoritos = 0;

  loginForm = { correo: '', password: '' };
  erroresLogin = { correo: false, password: false };
  loginExitoso = false;
  loginError = false;

  registroForm = { nombre: '', correo: '', password: '', password2: '' };
  erroresRegistro = { nombre: false, correo: false, password: false, password2: false };
  registroExitoso = false;
  registroError = false;

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    const sesion = localStorage.getItem('usuario_sesion');
    if (sesion) {
      this.usuario = JSON.parse(sesion);
      this.cantidadFavoritos = this.cursosService.getFavoritos().length;
      this.vista = 'perfil';
    }
  }

  iniciarSesion() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.erroresLogin.correo = !emailRegex.test(this.loginForm.correo.trim());
    this.erroresLogin.password = this.loginForm.password.length === 0;
    this.loginExitoso = false;
    this.loginError = false;

    if (!this.erroresLogin.correo && !this.erroresLogin.password) {
      const usuario = { nombre: this.loginForm.correo.split('@')[0], correo: this.loginForm.correo };
      localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
      this.usuario = usuario;
      this.cantidadFavoritos = this.cursosService.getFavoritos().length;
      this.loginExitoso = true;
      setTimeout(() => { this.vista = 'perfil'; }, 800);
    } else {
      this.loginError = true;
    }
  }

  registrar() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.erroresRegistro.nombre = this.registroForm.nombre.trim().length < 2;
    this.erroresRegistro.correo = !emailRegex.test(this.registroForm.correo.trim());
    this.erroresRegistro.password = this.registroForm.password.length < 6;
    this.erroresRegistro.password2 = this.registroForm.password !== this.registroForm.password2;
    this.registroExitoso = false;
    this.registroError = false;

    const hayError = Object.values(this.erroresRegistro).some(e => e);
    if (!hayError) {
      const usuario = { nombre: this.registroForm.nombre, correo: this.registroForm.correo };
      localStorage.setItem('usuario_sesion', JSON.stringify(usuario));
      this.usuario = usuario;
      this.cantidadFavoritos = this.cursosService.getFavoritos().length;
      this.registroExitoso = true;
      setTimeout(() => { this.vista = 'perfil'; }, 800);
    } else {
      this.registroError = true;
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario_sesion');
    this.usuario = null;
    this.vista = 'login';
    this.loginForm = { correo: '', password: '' };
  }
}
