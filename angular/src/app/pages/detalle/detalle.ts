import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursosService, Curso } from '../../services/cursos';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  curso: Curso | undefined;
  relacionados: Curso[] = [];

  constructor(
    private cursosService: CursosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.cursosService.getCursos().subscribe(cursos => {
        this.curso = cursos.find(c => c.id === id);
        if (this.curso) {
          this.relacionados = cursos
            .filter(c => c.categoria === this.curso!.categoria && c.id !== id)
            .slice(0, 3);
        }
      });
    });
  }

  esFavorito(): boolean {
    return this.curso ? this.cursosService.esFavorito(this.curso.id) : false;
  }

  toggleFav() {
    if (this.curso) {
      this.cursosService.toggleFavorito(this.curso.id);
    }
  }
}