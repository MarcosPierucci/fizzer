import { Routes } from '@angular/router';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { FiltroTareasComponent } from './admin/filtro-tareas/filtro-tareas.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InicioSesionComponent } from './user/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './user/registro/registro.component';
import { FormularioReportesComponent } from './user/formulario-reportes/formulario-reportes.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { PublicacionComponent } from './user/publicacion/publicacion.component';

export const routes: Routes = [
  {path: "admin-reportes", component:ReportesComponent},
  {path: "filtro-tareas", component: FiltroTareasComponent},
  {path: '', component: HomePageComponent},
  {path: "login", component: InicioSesionComponent},
  {path: "register", component: RegistroComponent},
  {path: "home", component: HomePageComponent},
  {path: "formulario-reportes" , component: FormularioReportesComponent},
  {path:"perfil", component:PerfilComponent},
  { path: "publicacion/:publicacionId/usuario/:usuarioId", component: PublicacionComponent }
];
