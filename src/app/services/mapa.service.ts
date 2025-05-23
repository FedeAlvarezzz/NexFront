import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { ReporteDTO } from '../interface/reporte-dto';




@Injectable({

  providedIn: 'root'

})
export class MapaService {

  mapa: any;
  marcadores: any[];
  posicionActual: LngLatLike;
  esBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.marcadores = [];
    this.posicionActual = [-75.67270, 4.53252];
    this.esBrowser = isPlatformBrowser(this.platformId); // ✅ Detecta si está en el navegador
  }

  public crearMapa() {
    if (!this.esBrowser) {
      console.warn('crearMapa: llamado en el servidor — cancelado');
      return;
    }

    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZmVkZWFsdmFyZXp6eiIsImEiOiJjbWFuNjg4YjQwNHp4MmtxNGhnOG1yeHd4In0.v8N31bzO1j8eyfiztLIKfQ',
      container: 'mapa',
      style: 'mapbox://styles/fedealvarezzz/cman6z275000j01qpeh21a59j',
      center: this.posicionActual,
      pitch: 45,
      zoom: 12
    });

    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }

  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;

    return new Observable<any>(observer => {
      if (!this.esBrowser || !mapaGlobal) {
        observer.error('No se puede agregar marcador: no se ha creado el mapa o estás en el servidor');
        return;
      }

      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());

        const marcador = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);

        marcadores.push(marcador);
        observer.next(marcador.getLngLat());
      });
    });
  }

  public pintarMarcadores(reportes: ReporteDTO[]) {
    if (!this.esBrowser || !this.mapa) {
      console.warn('pintarMarcadores: no hay mapa o estás en SSR');
      return;
    }

    reportes.forEach(reporte => {
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([reporte.ubicacion.longitud, reporte.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(reporte.titulo))
        .addTo(this.mapa);
    });
  }

  public colocarMarcador(lat: number, lng: number, titulo?: string) {
    if (!this.esBrowser || !this.mapa) {
      console.warn('colocarMarcador: no hay mapa o estás en SSR');
    return;
    }

    // Eliminar marcadores previos
  this.marcadores.forEach(marcador => marcador.remove());
  this.marcadores = [];

  const nuevoMarcador = new mapboxgl.Marker({ color: 'red' })
    .setLngLat([lng, lat])
    .addTo(this.mapa);

  this.marcadores.push(nuevoMarcador);
  }
}