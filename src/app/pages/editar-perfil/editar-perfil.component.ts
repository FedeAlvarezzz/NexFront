import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  imports:[ReactiveFormsModule], 
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  formularioPerfil!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioPerfil = this.fb.group({
      nombreCompleto: ['User 1', Validators.required],
      email: ['user@gmail.com', [Validators.required, Validators.email]],
      telefono: ['1234567890', Validators.required],
      ciudad: ['My City', Validators.required],
      direccion: ['MZ 1 CS 2', Validators.required],
      password: ['********', Validators.required]
    });
  }

  guardarCambios() {
    if (this.formularioPerfil.valid) {
      const datosActualizados = this.formularioPerfil.value;
      console.log("Datos a guardar:", datosActualizados);
      // Enviar Datos al Backend
    } else {
      console.log("Formulario inválido");
    }
  }
}
