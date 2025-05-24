import { Component } from '@angular/core';
import { CategoriaDTO } from '../../../../interface/categoria-dto';

@Component({
  selector: 'app-detalle-categorias',
  imports: [],
  templateUrl: './detalle-categorias.component.html',
  styleUrl: './detalle-categorias.component.css'
})
export class DetalleCategoriasComponent {
  categoria: CategoriaDTO;

  constructor() {
    // Simulación de datos de ejemplo
    this.categoria = {
      id: '1',
      titulo: 'Ejemplo de Categoría',
      descripcion: 'Esta es una descripción de ejemplo para la categoría.'
    };
  }

}
