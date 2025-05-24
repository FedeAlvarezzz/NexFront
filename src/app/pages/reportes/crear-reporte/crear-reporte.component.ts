import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';
import { ReporteDTO } from '../../../interface/reporte-dto';
import Swal from 'sweetalert2';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-crear-reporte',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-reporte.component.html',
  styleUrls: ['./crear-reporte.component.css']
})
export class CrearReporteComponent implements AfterViewInit {

  formularioReporte: FormGroup;
  mapa!: mapboxgl.Map;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private reportesService: ReportesService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    this.formularioReporte = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagen: ['', Validators.required],
      ubicacion: this.fb.group({
        latitud: ['', Validators.required],
        longitud: ['', Validators.required]
      })
    });
    
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZmVkZWFsdmFyZXp6eiIsImEiOiJjbWFuNjg4YjQwNHp4MmtxNGhnOG1yeHd4In0.v8N31bzO1j8eyfiztLIKfQ';
      this.mapa = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/fedealvarezzz/cman6z275000j01qpeh21a59j',
        center: [-75.67406052559213, 4.532223167514729],
        zoom: 12
      });

      this.mapa.on('click', (event: MapMouseEvent) => {
        const coordinates = event.lngLat;

        // Eliminar cualquier marcador existente
        const existingMarkers = document.getElementsByClassName('mapboxgl-marker');
        while (existingMarkers.length > 0) {
          existingMarkers[0].remove();
        }

        // Crear un nuevo marcador
        new mapboxgl.Marker()
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(this.mapa);

        // Actualizar el formulario
        this.formularioReporte.get('ubicacion.latitud')?.setValue(coordinates.lat);
        this.formularioReporte.get('ubicacion.longitud')?.setValue(coordinates.lng);

      });
    }
  }

  crearReporte(): void {
    if (this.formularioReporte.valid) {
      const nuevo: ReporteDTO = {
        id: '',
        titulo: this.formularioReporte.value.titulo,
        descripcion: this.formularioReporte.value.descripcion,
        estadoActual: 'Pendiente',
        imagen: this.formularioReporte.value.imagen,
        fecha: new Date(),
        categoria: this.formularioReporte.value.categoria,
        ubicacion: {
          latitud: this.formularioReporte.value.ubicacion.latitud,
          longitud: this.formularioReporte.value.ubicacion.longitud
        }
      };
  
      this.reportesService.crear(nuevo);
      this.formularioReporte.reset();
      Swal.fire('Reporte creado', 'Tu reporte fue enviado exitosamente', 'success');
    } else {
      Swal.fire('Formulario incompleto', 'Por favor completa todos los campos y selecciona una ubicación en el mapa', 'warning');
    }
    console.log(this.formularioReporte.value);
    console.log(this.formularioReporte.valid);

  }
  
  
}
