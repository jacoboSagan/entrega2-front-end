import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CursosService, Curso } from '../../services/cursos';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {
  cursos: Curso[] = [];
  cursosFiltrados: Curso[] = [];
  categorias: string[] = [];
  categoriaActiva = 'Todos';
  busqueda = '';

  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cursosService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
      this.categorias = ['Todos', ...new Set(cursos.map(c => c.categoria))];
      this.filtrar();
    });
  }

  filtrar() {
    let resultado = this.cursos;
    if (this.categoriaActiva !== 'Todos') {
      resultado = resultado.filter(c => c.categoria === this.categoriaActiva);
    }
    if (this.busqueda.trim()) {
      const q = this.busqueda.toLowerCase();
      resultado = resultado.filter(c =>
        c.nombre.toLowerCase().includes(q) ||
        c.descripcion.toLowerCase().includes(q) ||
        c.categoria.toLowerCase().includes(q)
      );
    }
    this.cursosFiltrados = resultado;
  }

  seleccionarCategoria(cat: string) {
    this.categoriaActiva = cat;
    this.filtrar();
  }

  esFavorito(id: number): boolean {
    return this.cursosService.esFavorito(id);
  }

  toggleFav(id: number) {
    this.cursosService.toggleFavorito(id);
  }
}
