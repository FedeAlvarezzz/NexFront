import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {


  registroForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) { 
    this.crearFormulario();
 }
 

  private crearFormulario() {
    this.registroForm = this.formBuilder.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
    });
   }

   public registrar() {
    console.log(this.registroForm.value);
 }
 
   

}
