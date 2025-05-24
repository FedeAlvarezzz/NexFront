import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CategoriaDTO } from '../../../../interface/categoria-dto';
import { CategoriasService } from '../../../../services/categorias.service';
@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  formularioCategoria: FormGroup;

  constructor(private fb: FormBuilder,
    private categoriaService: CategoriasService
  ) {
    
    this.formularioCategoria = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  crearCategoria(): void {
    if (this.formularioCategoria.valid) {
      const nuevo: CategoriaDTO ={
        id: '',
        titulo: this.formularioCategoria.value.titulo,
        descripcion: this.formularioCategoria.value.descripcion
      };
      
      this.categoriaService.crear(nuevo);
      this.formularioCategoria.reset();
      Swal.fire('Category Created', 'The category was successfully created', 'success');
    } else {
      Swal.fire('Incomplete Form', 'Please complete all fields', 'warning');
    }
  }
}