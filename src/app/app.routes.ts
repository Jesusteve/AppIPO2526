import { Routes } from '@angular/router';
import { Header } from './header/header';
import { CarritoComponent } from './carrito/carrito';

export const routes: Routes = [
  { path: '', component: Header },     // Página principal
  { path: 'carrito', component: CarritoComponent },  // Página del carrito
  { path: '**', redirectTo: '' }              // Redirigir a home si ruta no existe
];
