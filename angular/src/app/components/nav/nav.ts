import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav implements OnInit {
  cantidadFavoritos = 0;
  menuAbierto = false;
  
  constructor(private cursosService: CursosService) {}

  ngOnInit() {
    this.cantidadFavoritos = this.cursosService.getFavoritos().length;
  }
}
