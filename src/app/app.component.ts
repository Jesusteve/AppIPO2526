import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type ModoDaltonismo = 'normal' | 'deuteranopia' | 'protanopia' | 'lectura';

@Component({
  selector: 'main.ts',
  standalone: true,       
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrls: ['./styles.css']
})
export class AppComponent implements OnInit {
  modoActual: ModoDaltonismo = 'normal';

  ngOnInit(): void {
    this.cargarModoGuardado();
  }

  activarModo(modo: ModoDaltonismo): void {
  if (modo === 'deuteranopia') {
    document.body.style.backgroundColor = 'rgba(255, 200, 200, 0.3)'; // Rojo 
    document.body.style.filter = 'sepia(0.3) saturate(2) hue-rotate(-20deg)';
  } 
  else if (modo === 'protanopia') {
    document.body.style.backgroundColor = 'rgba(200, 255, 200, 0.3)'; // Verde
    document.body.style.filter = 'sepia(0.4) saturate(1.5) hue-rotate(15deg)';
  }
  else if (modo === 'lectura') {
    document.body.style.fontFamily = "'Segoe UI', Arial, sans-serif";
    document.body.style.textAlign = 'left';
    document.body.style.fontSize = '19px';
    document.body.style.lineHeight = '1.6';
    document.body.style.backgroundColor = '#FAFAFA';
    document.body.style.color = '#333';
  }
  else {
    document.body.style.backgroundColor = '';
    document.body.style.filter = 'none';
    document.body.style.fontFamily = '';
    document.body.style.textAlign = '';
    document.body.style.fontSize = '';
    document.body.style.lineHeight = '';
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
    document.body.style.filter = '';
  }
  
  this.modoActual = modo;
  localStorage.setItem('modoDaltonismo', modo);
  }
  desactivarModos(): void {
    this.activarModo('normal');
  }

  private cargarModoGuardado(): void {
    const modoGuardado = localStorage.getItem('modoDaltonismo') as ModoDaltonismo;
    
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
