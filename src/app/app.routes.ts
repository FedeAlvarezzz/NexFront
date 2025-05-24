import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeUsuarioComponent } from './pages/home-usuario/home-usuario.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { RecuperarComponent } from './pages/recuperar/recuperar.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GestionReportesComponent } from './pages/admin/gestion-reportes/gestion-reportes.component';
import { DetalleReporteComponent } from './pages/reportes/detalle-reporte/detalle-reporte.component';
import { CrearReporteComponent } from './pages/reportes/crear-reporte/crear-reporte.component';
import { CodigoConfirmacionComponent } from './pages/codigo-confirmacion/codigo-confirmacion.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { GestionCategoriasComponent } from './pages/admin/categorias/gestion-categorias/gestion-categorias.component';
import { DetalleCategoriasComponent } from './pages/admin/categorias/detalle-categorias/detalle-categorias.component';
import { CrearCategoriaComponent } from './pages/admin/categorias/crear-categoria/crear-categoria.component';



export const routes: Routes = [
   { path: '', redirectTo: 'inicio', pathMatch: 'full' },
   { path: 'inicio', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'home-usuario', component: HomeUsuarioComponent },
   { path: 'perfil-usuario', component: PerfilUsuarioComponent },
   { path: 'editar-perfil', component: EditarPerfilComponent },
   { path: 'recuperar', component: RecuperarComponent },
   { path: 'admin', component: AdminComponent },
   { path: 'gestion-reportes', component: GestionReportesComponent },
   { path: 'detalle-reporte/:id', component: DetalleReporteComponent },
   { path: 'editar-reporte/:id', component: CrearReporteComponent },
   { path: 'crear-reporte', component: CrearReporteComponent },
   { path: 'codigo-confirmacion', component: CodigoConfirmacionComponent },
   { path: 'home-admin', component: HomeAdminComponent},
   { path: 'gestion-categorias', component: GestionCategoriasComponent},
   { path: 'detalle-categorias/:id', component: DetalleCategoriasComponent},
   { path: 'crear-categoria', component: CrearCategoriaComponent}
];
