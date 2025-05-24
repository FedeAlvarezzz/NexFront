import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteDTO } from '../../interface/reporte-dto';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-home-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent implements OnInit {
  
  reportes: ReporteDTO[] = [];
  reportesFiltrados: ReporteDTO[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = true;
  error: string = '';

  constructor(
    private router: Router,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  /**
   * Carga todos los reportes disponibles
   */
  private cargarReportes(): void {
    try {
      this.cargando = true;
      this.error = '';
      
      // Obtener todos los reportes del servicio
      this.reportes = this.reportesService.listar();
      this.reportesFiltrados = [...this.reportes];
      
      // Si no hay reportes, mostrar mensaje
      if (this.reportes.length === 0) {
        this.error = 'No hay reportes disponibles en este momento';
      }
      
    } catch (err) {
      this.error = 'Error al cargar los reportes';
      console.error('Error al cargar reportes:', err);
    } finally {
      this.cargando = false;
    }
  }

  /**
   * Filtra los reportes basado en el término de búsqueda
   */
  public filtrarReportes(): void {
    if (!this.terminoBusqueda.trim()) {
      this.reportesFiltrados = [...this.reportes];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.reportesFiltrados = this.reportes.filter(reporte => {
      return reporte.titulo.toLowerCase().includes(termino) ||
             reporte.descripcion.toLowerCase().includes(termino) ||
             reporte.categoria?.toLowerCase().includes(termino) ||
             reporte.ciudad?.toLowerCase().includes(termino);
    });
  }

  /**
   * Método para el botón de búsqueda
   */
  public buscar(): void {
    this.filtrarReportes();
  }

  /**
   * Navega al detalle del reporte seleccionado
   */
  public verDetalle(idReporte: string): void {
    if (idReporte) {
      this.router.navigate(['/detalle-reporte', idReporte]);
    }
  }

  /**
   * Método auxiliar para formatear la fecha
   */
  public formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Método auxiliar para formatear la ubicación
   */
  public formatearUbicacion(ubicacion: any): string {
    if (!ubicacion) return 'Ubicación no disponible';
    
    // Si tienes información de dirección
    if (ubicacion.direccion) {
      return ubicacion.direccion;
    }
    
    // Si solo tienes coordenadas
    if (ubicacion.latitud && ubicacion.longitud) {
      return `${ubicacion.latitud.toFixed(4)}, ${ubicacion.longitud.toFixed(4)}`;
    }
    
    return 'Ubicación no disponible';
  }

  /**
   * Método para obtener la imagen por defecto si no hay imagen
   */
  public obtenerImagenPorDefecto(): string {
    return 'assets/images/no-image-placeholder.jpg';
  }

  /**
   * Método para manejar errores de carga de imagen
   */
  public onImageError(event: any): void {
    event.target.src = this.obtenerImagenPorDefecto();
  }

  /**
   * Método para recargar los reportes
   */
  public recargarReportes(): void {
    this.terminoBusqueda = '';
    this.cargarReportes();
  }
}