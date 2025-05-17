import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  reportes: any[] = [];


  cargarReportes() {
    this.reportes = JSON.parse(localStorage.getItem('reportes') || '[]');
  }

  cambiarEstado(reporte: any, nuevoEstado: string) {
    const index = this.reportes.findIndex(r => r.id === reporte.id);
    if (index !== -1) {
      this.reportes[index].estado = nuevoEstado;
      localStorage.setItem('reportes', JSON.stringify(this.reportes));
      alert(`🔔 Estado del reporte actualizado a "${nuevoEstado}"`);
      this.cargarReportes();
    }
  }

  eliminarReporte(reporteId: string) {
    this.reportes = this.reportes.filter(r => r.id !== reporteId);
    localStorage.setItem('reportes', JSON.stringify(this.reportes));
    alert('🗑️ Reporte eliminado con éxito');
    this.cargarReportes();
  }
  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
  }  
}