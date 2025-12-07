
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpsService } from '../services/gps.serv';
@Component({
  selector: 'app-gps', //  <app-gps></app-gps> (asi se usa en html)
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gps.html',
  styleUrls: ['./gps.css']
})
export class GpsComponent {
  cargando: boolean = false;
  error: string = '';
  ubicacion: any = null;
  estado: 'inicial' | 'cargando' | 'exito' | 'error' = 'inicial';


  
  constructor(private gpsService: GpsService) { }

  //click en el boton
  async obtenerUbicacion() {
    this.estado = "cargando";
    this.cargando = true;
    this.error = '';
    this.ubicacion = null;

    try {
     
      this.ubicacion = await this.gpsService.obtenerUbicacion();
      this.estado = "exito";
    } catch (err: any) {
      this.error = err;
      this.estado = "error";
    } finally {
      this.cargando = false;

    }
  }

  // Abrir Google Maps 
  verEnGoogleMaps() {
    if (this.ubicacion) {
      window.open(
        `https://www.google.com/maps?q=${this.ubicacion.latitud},${this.ubicacion.longitud}`,
        '_blank'
      );
    }
  }

  reiniciar() {
    this.estado = "inicial";
    this.error = '';
    this.ubicacion = null;
  }
}
