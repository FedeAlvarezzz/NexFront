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
    this.categorias = categoriaService.listar(); // Inicialización de la lista de categorías
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
      title: "¿Estás seguro?",
      text: "Esta acción eliminará las categorías seleccionadas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarCategorias();
        Swal.fire("¡Eliminadas!", "Las categorías seleccionadas han sido eliminadas.", "success");
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
      this.textoBtnEliminar = tam === 1 ? "1 elemento" : `${tam} elementos`;
    } else {
      this.textoBtnEliminar = "";
    }
  }
}

