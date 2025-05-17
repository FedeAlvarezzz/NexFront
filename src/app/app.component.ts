import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
})
export class AppComponent {
  mostrarLayout = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const rutasSinLayout = ['/login', '/registro', '/inicio', '/', '/codigo-confirmacion', '/home-admin'];
        this.mostrarLayout = !rutasSinLayout.includes(event.urlAfterRedirects);
      });
  }
}
