import { Injectable } from '@angular/core';
import { CategoriaDTO } from '../interface/categoria-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  categorias: CategoriaDTO[] = [];

  constructor() {
    this.categorias;
    this.crearCategoriasPrueba();
  }

  public listar() {
    return this.categorias;
  }

  public crear(crearCategoriaDTO: CategoriaDTO) {
    this.categorias.push(crearCategoriaDTO);
  }

  public obtener(id: string): CategoriaDTO | undefined {
    return this.categorias.find(categoria => categoria.id == id);
  }

  public eliminar(id: string) {
    this.categorias = this.categorias.filter(categoria => categoria.id != id);
  }

  public editar(id: string, editarCategoriaDTO: CategoriaDTO) {
    const indice = this.categorias.findIndex(categoria => categoria.id == id);
    if (indice != -1) {
      this.categorias[indice] = editarCategoriaDTO;
    }
  }

  public crearCategoriasPrueba() {
    this.categorias.push({
      id: '1',
      titulo: 'Alumbrado Público',
      descripcion: 'Reportes relacionados con el alumbrado público en la ciudad.'
    });

    this.categorias.push({
      id: '2',
      titulo: 'Robo',
      descripcion: 'Reportes de robos o hurtos en la zona.'
    });

    this.categorias.push({
      id: '3',
      titulo: 'Mascota Perdida',
      descripcion: 'Reportes de mascotas perdidas en la comunidad.'
    });

    this.categorias.push({
      id: '4',
      titulo: 'Vandalismo',
      descripcion: 'Reportes de vandalismo o daños a la propiedad pública.'
    });

    this.categorias.push({
      id: '5',
      titulo: 'Incendio',
      descripcion: 'Reportes de incendios en la zona.'
    });

  }

}