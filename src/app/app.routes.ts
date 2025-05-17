import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { GestionReportesComponent } from './pages/admin/gestion-reportes/gestion-reportes.component';
import { DetalleReporteComponent } from './pages/reportes/detalle-reporte/detalle-reporte.component';
import { CrearReporteComponent } from './pages/reportes/crear-reporte/crear-reporte.component';
import { CodigoConfirmacionComponent } from './pages/codigo-confirmacion/codigo-confirmacion.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { GestionCategoriasComponent } from './pages/admin/gestion-categorias/gestion-categorias.component';



export const routes: Routes = [
   { path: '', redirectTo: 'inicio', pathMatch: 'full' },
   { path: 'inicio', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'perfil', component: PerfilComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'categorias', component: CategoriasComponent },
   { path: 'gestion-reportes', component: GestionReportesComponent },
   { path: 'detalle-reporte/:id', component: DetalleReporteComponent },
   { path: 'editar-reporte/:id', component: CrearReporteComponent },
   { path: 'crear-reporte', component: CrearReporteComponent },
   { path: 'codigo-confirmacion', component: CodigoConfirmacionComponent },
   { path: 'home-admin', component: HomeAdminComponent},
   { path: 'gestion-categorias', component: GestionCategoriasComponent}
];
