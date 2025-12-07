// src/app/services/gps.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  // Método para obtener la ubicación
  obtenerUbicacion(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 1. Verificar si el navegador soporta GPS
      if (!navigator.geolocation) {
        reject('Tu navegador no tiene GPS');
        return;
      }

      // 2. Pedir la ubicación al navegador
      navigator.geolocation.getCurrentPosition(
        
        (posicion) => {
          resolve({
            latitud: posicion.coords.latitude,
            longitud: posicion.coords.longitude,
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
}
