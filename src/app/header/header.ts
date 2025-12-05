import { Component } from '@angular/core';
type ModoAccesibilidad = 'daltonismo' | 'deuteranopia' | 'protanopia' | 'lectura' | 'lecturaDesc' | 'normal';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  modoActual: ModoAccesibilidad = 'normal';
  cargando: boolean = false;
  menuAbierto: boolean = false;
  mostrarPanelDaltonismo: boolean = false;
  mostrarPanelLectura: boolean = false;
  mostrarLogin: boolean = false;
  mostrarRegistro: boolean = false;

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
    }
    else if (modo == 'lecturaDesc') {
      document.body.classList.remove('modo-lectura');
    }
    else {
      document.body.style.backgroundColor = '';
      document.body.style.filter = 'none';
      document.body.classList.remove('modo-lectura');
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
    this.menuAbierto = !this.menuAbierto;
  }

  realizarBusqueda(): void {
    if (this.cargando) return; // Evita doble click

    this.cargando = true; // Activa la animación

    // Simulamos un retraso de 2 segundos (tiempo percibido)
    setTimeout(() => {
      this.cargando = false; // Desactiva la animación
      alert('¡Búsqueda completada! (Aquí se mostrarían los resultados)');
    }, 2000);
  }

  // Función abrir panel
  abrirPanelAccesibilidad(tipo: 'daltonismo' | 'lectura'): void {
    this.menuAbierto = false; // IMPORTANTE: Cierra el menú al hacer click

    if (tipo === 'daltonismo') {
      this.mostrarPanelDaltonismo = true;
      this.mostrarPanelLectura = false;
    } else {
      this.mostrarPanelLectura = true;
      this.mostrarPanelDaltonismo = false;
    }
  }
  toggleLogin(): void {
    this.mostrarLogin = !this.mostrarLogin;
  }
}
