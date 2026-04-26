import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  form = { nombre: '', correo: '', asunto: '', mensaje: '' };
  errores = { nombre: false, correo: false, asunto: false, mensaje: false };
  enviado = false;
  hayErrores = false;

  enviar() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.errores.nombre = this.form.nombre.trim().length < 2;
    this.errores.correo = !emailRegex.test(this.form.correo.trim());
    this.errores.asunto = this.form.asunto === '';
    this.errores.mensaje = this.form.mensaje.trim().length < 10;

    this.hayErrores = Object.values(this.errores).some(e => e);
    this.enviado = false;

    if (!this.hayErrores) {
      this.enviado = true;
      this.form = { nombre: '', correo: '', asunto: '', mensaje: '' };
    }
  }
}
