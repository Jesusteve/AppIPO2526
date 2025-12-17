import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpsComponent } from './gps/gps'
import { ChatBot } from './chatbot/chatbot';
type ModoAccesibilidad = 'daltonismo' | 'deuteranopia' | 'protanopia' | 'lectura' | 'lecturaDesc' | 'normal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GpsComponent, ChatBot],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  modoActual: ModoAccesibilidad = 'normal';
  cargando: boolean = false;
  menuAbierto: boolean = false;
  mostrarPanelDaltonismo: boolean = false;
  mostrarPanelLectura: boolean = false;
  mostrarLogin: boolean = false;
  mostrarRegistro: boolean = false;
  direccionEnvio: string = '';
  escuchando: boolean = false;
  showChat = false;
  hasUnreadMessages = false;

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

  realizarBusqueda(terminoBusqueda: string): void {
    if (this.cargando) return;

    // Si el cuadro de búsqueda no está vacío, decimos qué buscamos
    if (terminoBusqueda.trim()) {
      this.hablar(`Buscando ${terminoBusqueda} en el catálogo...`);
    } else {
      this.hablar('Por favor, dime qué herramienta necesitas.');
      return; // No buscamos si está vacío
    }

    this.cargando = true;

    // Simulamos el retraso
    setTimeout(() => {
      this.cargando = false;
      this.hablar(`Búsqueda completada. He encontrado resultados para ${terminoBusqueda}.`);
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

  autocompletarUbi(input: HTMLInputElement) {
    const ubi = localStorage.getItem('ultimaUbicacion');

    if (!ubi) {
      alert('Ubicación no detectada, habilita la detección');
      return;
    }

    try {
      const datos = JSON.parse(ubi);
      input.value = datos.direccion;

      // Feedback visual
      input.style.borderColor = '#4CAF50';
      input.style.backgroundColor = '#f0fff4';

    }
    catch (e) {
      alert('Error al obtener la ubicación guardada');
    }
  }
  hablar(texto: string): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES'; // Idioma español
      utterance.rate = 1;       // Velocidad normal
      window.speechSynthesis.speak(utterance);
    }
  }

  activarReconocimientoVoz(inputElement: HTMLInputElement): void {
    // Verificamos si el navegador soporta la API (Chrome, Edge, Safari reciente)
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Tu navegador no soporta el reconocimiento de voz. Intenta usar Google Chrome.");
      return;
    }

    // Inicializamos la API (usando 'any' para evitar errores de tipado en TS estricto)
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'es-ES'; // Configurado para Español
    recognition.continuous = false; // Se detiene al dejar de hablar
    recognition.interimResults = false; // Solo muestra resultados finales

    recognition.onstart = () => {
      this.escuchando = true; // Activa animación visual
    };

    recognition.onend = () => {
      this.escuchando = false; // Desactiva animación visual
    };

    recognition.onresult = (event: any) => {
      const resultado = event.results[0][0].transcript;

      inputElement.value = resultado;

      this.realizarBusqueda(resultado);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      this.escuchando = false;
    };

    recognition.start();


  }

  onNewMessage(event: any) {
    if (!this.showChat) {
      this.hasUnreadMessages = true;
    }
  }
}
