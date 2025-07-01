import { Routes } from '@angular/router';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { FiltroTareasComponent } from './admin/filtro-tareas/filtro-tareas.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InicioSesionComponent } from './user/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './user/registro/registro.component';
import { FormularioReportesComponent } from './user/formulario-reportes/formulario-reportes.component';
import { PerfilComponent } from './user/perfil/perfil.component';
import { PublicacionComponent } from './user/publicacion/publicacion.component';
import { FormularioTareasComponent } from './user/formulario-tareas/formulario-tareas.component';
import { EditarPerfilComponent } from './user/editar-perfil/editar-perfil.component';
import { SubirPublicacionComponent } from './user/subir-publicacion/subir-publicacion.component';
import { ResultadosBusquedaComponent } from './user/resultados-busqueda/resultados-busqueda.component';
import { VerTareaComponent } from './user/ver-tarea/ver-tarea.component';
import { NavegadorTareasComponent } from './user/navegador-tareas/navegador-tareas.component';
import { VotacionesComponent } from './user/votaciones/votaciones.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {path: 'admin-reportes',
  canActivate: [AuthGuard],


  data: { soloAdmin: true }, //  esto le dice al guard que requiere admin

  loadComponent: () => import('./admin/reportes/reportes.component').then(c => c.ReportesComponent)},

  {path: 'filtro-tareas',
  canActivate: [AuthGuard],

  

  data: { soloAdmin: true }, //  esto le dice al guard que requiere admin

  loadComponent: () => import('./admin/filtro-tareas/filtro-tareas.component').then(c => c.FiltroTareasComponent)},

  {path: '', component: InicioSesionComponent},
  {path: "login", component: InicioSesionComponent},
  {path: "register", component: RegistroComponent},
  {path: "home", component: HomePageComponent},
  {path: "formulario-tareas", component: FormularioTareasComponent},
  {path: "formulario-reportes", component: FormularioReportesComponent},
  {path: "perfil", component:PerfilComponent},
  {path: "publicacion/:publicacionId/usuario/:usuarioId", component: PublicacionComponent},
  {path: "editar-perfil", component: EditarPerfilComponent},
  {path: "formulario-publicacion", component: SubirPublicacionComponent },
  {path: "perfil/:id", component: PerfilComponent},
  {path: "resultados-busqueda", component: ResultadosBusquedaComponent},
  {path: "ver-tarea" , component: VerTareaComponent},
  {path: 'navegar-tareas-individuales', component: NavegadorTareasComponent},
  {path: "votaciones", component: VotacionesComponent},
  { path: 'editar-publicacion/:id', component: SubirPublicacionComponent },
  { path: 'formulario-publicacion',    component: SubirPublicacionComponent },



];
