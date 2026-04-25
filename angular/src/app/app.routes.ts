import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cursos } from './pages/cursos/cursos';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Contacto } from './pages/contacto/contacto';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'cursos', component: Cursos },
  { path: 'detalle/:id', component: Detalle },
  { path: 'favoritos', component: Favoritos },
  { path: 'contacto', component: Contacto },
  { path: 'login', component: Login },
  { path: '**', redirectTo: '' }
];