// src/app/services/gps.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  // Método para obtener la ubicación
  async obtenerUbicacion(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 1. Verificar si el navegador soporta GPS
      if (!navigator.geolocation) {
        reject('Tu navegador no tiene GPS');
        return;
      }

      // 2. Pedir la ubicación al navegador
      navigator.geolocation.getCurrentPosition(
       
        async (position) => {
          const latitud = position.coords.latitude;
          const longitud = position.coords.longitude;

          const direccion = await this.coordenadasADireccion(latitud, longitud);

          resolve({
            latitud: latitud,
            longitud: longitud,
            direccion: direccion
            
          });
        },
        
        (error) => {
          let mensaje = 'Error desconocido';
          if (error.code === 1) mensaje = 'No diste permiso';
          if (error.code === 2) mensaje = 'GPS no disponible';
          if (error.code === 3) mensaje = 'Se tardó demasiado';
          reject(mensaje);
        }
      );
    });
  }

  private async coordenadasADireccion(lat: number, lon: number): Promise<string> {
    try {
      //Usamos OpenStreetMap Nominatim API para obtener la direccion
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

      const response = await fetch(url);
      const data = await response.json();

      //si mostramos display_name sin filtrar devuelve demasiados datos
      const address = data.address || {};

      //Filtramos
      let direccion = '';

      if (address.road) {
        direccion += address.road;
        if (address.house_number) {
          direccion += ' ' + address.house_number;
        }
        direccion += ', ';
      }

      if (address.city) {
        direccion += address.city + ', ';
      } else if (address.town) {
        direccion += address.town + ', ';
      } else if (address.village) {
        direccion += address.village + ', ';
      }

      if (address.province) {
        direccion += address.province + ', ';
      }

      if (address.postcode) {
        direccion += address.postcode;
      }

      if (!address.road && direccion) {
        return 'En ${direccion}';
      }
     
      return direccion || 'Dirección no encontrada';
    } catch (error) {
      console.log("Error obteniendo dirección");
      return '${lat.toFixed(2)}, ${lon.toFixed(2)} '}
    }
  }
