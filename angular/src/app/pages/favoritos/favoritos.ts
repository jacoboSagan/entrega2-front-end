import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursosService, Curso } from '../../services/cursos';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  favs: Curso[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  cargarFavoritos() {
    const ids = this.cursosService.getFavoritos();
    this.cursosService.getCursos().subscribe(cursos => {
      this.favs = cursos.filter(c => ids.includes(c.id));
    });
  }

  quitarFavorito(id: number) {
    this.cursosService.toggleFavorito(id);
    this.favs = this.favs.filter(c => c.id !== id);
  }
}