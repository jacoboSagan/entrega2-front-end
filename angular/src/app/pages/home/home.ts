import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursosService, Curso } from '../../services/cursos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  cursosPopulares: Curso[] = [];

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cursosService.getCursos().subscribe(cursos => {
      this.cursosPopulares = cursos.slice(0, 4);
    });
  }

  esFavorito(id: number): boolean {
    return this.cursosService.esFavorito(id);
  }

  toggleFav(id: number) {
    this.cursosService.toggleFavorito(id);
  }
}