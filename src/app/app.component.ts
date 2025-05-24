import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderUsuarioComponent } from './components/header-usuario/header-usuario.component'; 
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet, HeaderComponent, HeaderUsuarioComponent, FooterComponent, CommonModule],
})
export class AppComponent {
  mostrarBarraAdmin = false;
  mostrarBarraUsuario = false;

  // Rutas que deben mostrar cada barra
  private readonly rutasConBarraAdmin = [
    '/home-admin',
    '/gestion-reportes',
    '/gestion-categorias',
    '/perfil-admin'
  ];

  private readonly rutasConBarraUsuario = [
    '/perfil-usuario',
    '/crear-reporte',
    '/mis-reportes',
    '/editar-perfil',
    '/detalle-reporte',
    '/home-usuario',
    '/detalle-reporte/'
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
      const rutaActual = event.urlAfterRedirects;

      console.log('Ruta actual:', rutaActual);
      
      this.mostrarBarraUsuario = this.rutasConBarraUsuario.some(ruta => rutaActual.startsWith(ruta))
      this.mostrarBarraAdmin = this.rutasConBarraAdmin.some(ruta => rutaActual.startsWith(ruta))
    });
  }
}