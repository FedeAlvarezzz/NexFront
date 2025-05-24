import { Component } from '@angular/core';
import { CrearCategoriaDTO } from '../../../../interface/crear-categoria-dto';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriasService } from '../../../../services/categorias.service';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css' 
})
export class GestionCategoriasComponent {
  categorias: CrearCategoriaDTO[];
  seleccionados: CrearCategoriaDTO[];
  textoBtnEliminar: string;
  
  constructor(public categoriaService: CategoriasService) {
    // Inicialización de la lista de categorías
    this.categorias = [];
    this.seleccionados = []; // Inicialización de la lista de categorías seleccionadas
    this.textoBtnEliminar = ""; // Inicialización del texto del botón de eliminación
  }
  
  public seleccionar(categoria: CrearCategoriaDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(categoria);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(categoria), 1);
    }
    this.actualizarMensaje();
  }
  
  public confirmarEliminacion() {
    Swal.fire({
      title: "You are sure?",
      text: "This action will delete the selected categories.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCategorias();
        Swal.fire("¡Eliminated!", "The selected categories have been deleted.", "success");
      }
    });
  }
  
  public eliminarCategorias() {
    this.seleccionados.forEach(e1 => {
      this.categoriaService.eliminar(e1.titulo);
      this.categorias = this.categorias.filter(e2 => e2 !== e1);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  
  
  private actualizarMensaje() {
    const tam = this.seleccionados.length;
  
    if (tam != 0) {
      this.textoBtnEliminar = tam === 1 ? "1 category" : `${tam} categories`;
    } else {
      this.textoBtnEliminar = "";
    }
  }
}

