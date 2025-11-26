import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type ModoAccesibilidad = 'daltonismo' | 'deuteranopia' | 'protanopia' | 'lectura' | 'lecturaDesc' | 'normal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // si tienes estilos específicos
})
export class AppComponent implements OnInit {
  modoActual: ModoAccesibilidad = 'normal';

  ngOnInit(): void {
    this.cargarModoGuardado();
  }

  activarModo(modo: ModoAccesibilidad): void {
    if (modo === 'deuteranopia') {
      // Deuteranopía: dificultad para ver VERDES
      document.body.style.backgroundColor = 'rgba(200, 255, 200, 0.3)'; // Verde claro
      document.body.style.filter = 'sepia(0.3) saturate(2) hue-rotate(-20deg)';
    }
    else if (modo === 'protanopia') {
      // Protanopía: dificultad para ver ROJOS - DEBE SER ROJO
      document.body.style.backgroundColor = 'rgba(255, 200, 200, 0.3)'; // Rojo claro
      document.body.style.filter = 'sepia(0.4) saturate(1.5) hue-rotate(15deg)';
    }
    else if (modo === 'lectura') {
      document.body.classList.add('modo-lectura');


    }
    else if (modo == 'daltonismo') {
      // Reset a normal
      document.body.style.backgroundColor = '';
      document.body.style.filter = 'none';
      document.body.classList.remove('modo-protanopia', 'modo-deuteranopia');
    }
    else if (modo == 'lecturaDesc') {
      document.body.style.fontFamily = '';
      document.body.style.textAlign = '';
      document.body.style.fontSize = '';
      document.body.style.lineHeight = '';
      document.body.style.color = '';
      document.body.classList.remove('modo-lectura');
    }
    else {
      document.body.style.backgroundColor = '';
      document.body.style.filter = 'none';
      document.body.style.fontFamily = '';
      document.body.style.textAlign = '';
      document.body.style.fontSize = '';
      document.body.style.lineHeight = '';
      document.body.style.color = '';
      document.body.classList.remove('modo-protanopia', 'modo-deuteranopia','modo-lectura');
    }

    this.modoActual = modo;
    localStorage.setItem('ModoAccesibilidad', modo);
  }
  desactivarModo(modo: ModoAccesibilidad): void {
    this.activarModo(modo);
  }


  private cargarModoGuardado(): void {
    const modoGuardado = localStorage.getItem('ModoAccesibilidad') as ModoAccesibilidad;
    
    
    
    if (modoGuardado && modoGuardado !== 'normal') {
      this.activarModo(modoGuardado);
    }
  }

  toggleMenu(): void {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.classList.toggle('active');
    }
  }
}
