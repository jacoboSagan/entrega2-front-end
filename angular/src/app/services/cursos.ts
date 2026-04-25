import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Curso {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  descripcionLarga: string;
  emoji: string;
  duracion: string;
  nivel: string;
  instructor: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url = 'cursos.json';

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  getFavoritos(): number[] {
    return JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  toggleFavorito(id: number): boolean {
    const favs = this.getFavoritos();
    const idx = favs.indexOf(id);
    if (idx === -1) {
      favs.push(id);
      localStorage.setItem('favoritos', JSON.stringify(favs));
      return true;
    } else {
      favs.splice(idx, 1);
      localStorage.setItem('favoritos', JSON.stringify(favs));
      return false;
    }
  }

  esFavorito(id: number): boolean {
    return this.getFavoritos().includes(id);
  }
}
