import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { CodigoConfirmacionComponent } from './pages/codigo-confirmacion/codigo-confirmacion.component';


export const routes: Routes = [
   { path: '', redirectTo: 'inicio', pathMatch: 'full' },
   { path: 'inicio', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'codigo-confirmacion', component: CodigoConfirmacionComponent }
];
