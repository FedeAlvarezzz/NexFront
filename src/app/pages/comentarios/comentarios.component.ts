import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteDTO } from '../../interface/reporte-dto';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ IMPORTAR ESTO

interface ComentarioDTO {
  id: string;
  userName: string;
  content: string;
  createdAt: Date;
}

interface UbicacionDTO {
  latitud: number;
  longitud: number;
}

@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  reportId: string = '1';
  currentReport: ReporteDTO | null = null;
  comments: ComentarioDTO[] = [];
  newComment: Partial<ComentarioDTO> = { content: '' };
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reportId = this.route.snapshot.paramMap.get('id') || '';
    this.loadReport();
    this.loadComments();
  }

  loadReport(): void {
    // Simulación de reporte basado en tu ReporteDTO
    this.currentReport = {
      id: this.reportId,
      titulo: 'Título de prueba',
      descripcion: 'Descripción del reporte simulado.',
      imagen: 'https://via.placeholder.com/150',
      fecha: new Date(),
      categoria: 'Categoría ejemplo',
      estadoActual: 'Abierto',
      ubicacion: {
        latitud: 4.711,
        longitud: -74.072
      },
      ciudad: 'Bogotá',
      votosImportancia: 5
    };
  }

  loadComments(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.comments = [
        {
          id: 'c1',
          userName: 'Ana Pérez',
          content: 'Estoy de acuerdo con este reporte.',
          createdAt: new Date()
        },
        {
          id: 'c2',
          userName: 'Luis Gómez',
          content: 'Ojalá lo solucionen pronto.',
          createdAt: new Date()
        }
      ];
      this.isLoading = false;
    }, 1000);
  }

  addComment(): void {
    if (!this.newComment.content?.trim()) return;

    this.isLoading = true;
    setTimeout(() => {
      this.comments.push({
        id: Date.now().toString(),
        userName: 'UsuarioActual',
        content: this.newComment.content!.trim(),
        createdAt: new Date()
      });

      this.newComment.content = '';
      this.isLoading = false;
    }, 1000);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  getStatusClass(status?: string): string {
  switch (status) {
    case 'Pendiente':
      return 'status-pendiente';
    case 'En Proceso':
      return 'status-proceso';
    case 'Resuelto':
      return 'status-resuelto';
    default:
      return 'status-desconocido'; // o simplemente ''
  }
}

  goBack(): void {
    window.history.back();
  }

  trackByCommentId(index: number, comment: ComentarioDTO): string {
    return comment.id;
  }
}
