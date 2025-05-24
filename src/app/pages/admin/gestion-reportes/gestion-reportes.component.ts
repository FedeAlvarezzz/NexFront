import { Component } from '@angular/core';
import { ReporteDTO } from '../../../interface/reporte-dto';
import { ReportesService } from '../../../services/reportes.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-reportes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gestion-reportes.component.html',
  styleUrl: './gestion-reportes.component.css'
})
export class GestionReportesComponent {
  reportes: ReporteDTO[];
  seleccionados: ReporteDTO[];             // ✅ Atributo nuevo
  textoBtnEliminar: string;                // ✅ Variable para mostrar mensaje

  constructor(public reportesService: ReportesService) {
    this.reportes = reportesService.listar();
    this.seleccionados = [];              // ✅ Inicialización
    this.textoBtnEliminar = "";           // ✅ Inicialización
  }

  public seleccionar(reporte: ReporteDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(reporte);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(reporte), 1);
    }

    this.actualizarMensaje();
  }
  public confirmarEliminacion() {
    Swal.fire({
      title: "You are sure?",
      text: "This action will change the status of the reports to Deleted.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarReportes();
        Swal.fire("Eliminated!", "The selected reports have been deleted.", "success");
      }
    });
   }

   public eliminarReportes() {
    this.seleccionados.forEach(e1 => {
      this.reportesService.eliminar(e1.id);
      this.reportes = this.reportes.filter(e2 => e2.id !== e1.id);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
   }
   
   

  private actualizarMensaje() {
    const tam = this.seleccionados.length;

    if (tam != 0) {
      this.textoBtnEliminar = tam === 1 ? "1 report" : `${tam} reports`;
    } else {
      this.textoBtnEliminar = "";
    }
  }
}
