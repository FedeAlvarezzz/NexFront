import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReporteDTO } from '../../../interface/reporte-dto';
import { ReportesService } from '../../../services/reportes.service';
import { MapaService } from '../../../services/mapa.service';

@Component({
  selector: 'app-detalle-reporte',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-reporte.component.html',
  styleUrls: ['./detalle-reporte.component.css']
})
export class DetalleReporteComponent implements OnInit, OnDestroy {
  
  idReporte: string = '';
  reporte: ReporteDTO | undefined;
  yaVotado: boolean = false;
  error: string = '';
  private mapaInicializado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportesService: ReportesService,
    private mapaService: MapaService
  ) {}

  ngOnInit(): void {
    // Obtener el ID del reporte desde la ruta
    this.route.params.subscribe((params) => {
      this.idReporte = params['id'];
      if (this.idReporte) {
        this.obtenerReporte();
        this.verificarVoto();
      }
    });
  }

  ngOnDestroy(): void {
    // El MapaService maneja su propia limpieza
    // No necesitamos hacer nada especial aquí
  }

  /**
   * Obtiene los detalles del reporte
   */
  public obtenerReporte(): void {
    try {
      this.error = '';
      const reporteConsultado = this.reportesService.obtener(this.idReporte);
      
      if (reporteConsultado) {
        this.reporte = reporteConsultado;
        this.inicializarMapa();
      } else {
        this.error = 'The requested report could not be found';
      }
    } catch (err) {
      this.error = 'Error al cargar los detalles del reporte';
      console.error('Error al obtener reporte:', err);
    }
  }

  /**
   * Inicializa el mapa con la ubicación del reporte
   */
  private inicializarMapa(): void {
    if (!this.reporte?.ubicacion) return;

    setTimeout(() => {
      try {
        // Configurar posición inicial del mapa
        this.mapaService.posicionActual = [
          this.reporte!.ubicacion.longitud,
          this.reporte!.ubicacion.latitud
        ];

        // Crear el mapa (usa el ID por defecto 'mapa')
        this.mapaService.crearMapa();
        this.mapaInicializado = true;

        // Colocar marcador después de un breve delay
        setTimeout(() => {
          this.mapaService.colocarMarcador(
            this.reporte!.ubicacion.latitud,
            this.reporte!.ubicacion.longitud,
            this.reporte!.titulo
          );
        }, 500);

      } catch (err) {
        console.error('Error al inicializar mapa:', err);
      }
    }, 100);
  }

  /**
   * Verifica si el usuario ya votó por este reporte
   */
  private verificarVoto(): void {
    // Implementar lógica de verificación de voto
    // Por ejemplo, verificar en localStorage o en un servicio
    const votosGuardados = localStorage.getItem('votos') || '[]';
    const votos = JSON.parse(votosGuardados);
    this.yaVotado = votos.includes(this.idReporte);
  }

  /**
   * Maneja el voto del usuario para marcar el reporte como importante
   */
  public votarReporte(): void {
    if (this.yaVotado || !this.reporte) return;

    try {
      // Actualizar contador local
      this.reporte.votosImportancia++;
      this.yaVotado = true;
      
      // Guardar voto en localStorage
      const votosGuardados = localStorage.getItem('votos') || '[]';
      const votos = JSON.parse(votosGuardados);
      votos.push(this.idReporte);
      localStorage.setItem('votos', JSON.stringify(votos));
      
      // Actualizar en el servicio si tienes un método para ello
      this.reportesService.actualizarContadorVotos(this.idReporte, this.reporte.votosImportancia);

      
      console.log('Voto registrado exitosamente');
    } catch (err) {
      console.error('Error al votar:', err);
    }
  }

  /**
   * Navega a la vista de comentarios
   */
  public irAComentarios(): void {
    this.router.navigate(['/comentarios', this.idReporte]);
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
}