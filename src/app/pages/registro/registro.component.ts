import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroDTO } from '../../interface/registro-dto';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { MensajeDTO } from '../../interface/mensaje-dto';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegistroComponent {
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.miFormulario = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmarPassword: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]

    });
  }

  public registrar() {
    console.log("Se hizo clic en el botón REGISTER");
    console.log("Intentando registrar usuario...");
  
    if (this.miFormulario.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor complete todos los campos correctamente',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    const registro = this.miFormulario.value as RegistroDTO;
    console.log("Datos enviados al backend:", registro);
  
    this.usuarioService.registrarUsuario(registro).subscribe({
      next: (data: MensajeDTO) => { 
        console.log('Respuesta del backend:', data);
  
        Swal.fire({
          title: 'Cuenta creada',
          text: 'La cuenta se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/codigo-confirmacion']);
          }
        });
      },
      error: (error: any) => {
        console.error("Error al registrar:", error);
        Swal.fire({
          title: 'Error',
          text: error?.error?.respuesta ?? 'Error inesperado',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
}