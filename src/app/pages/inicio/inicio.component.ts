import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Código a ejecutar al inicializar el componente
    console.log('Componente Inicio inicializado');
  }

  irALogin(): void {
    this.router.navigate(['/login']);
    console.log('Navegando a /login');
  }

  // Métodos adicionales para la lógica del componente
  
}
