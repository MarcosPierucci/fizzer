import { Routes } from '@angular/router';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { FiltroTareasComponent } from './admin/filtro-tareas/filtro-tareas.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InicioSesionComponent } from './user/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './user/registro/registro.component';

export const routes: Routes = [
  {path: "admin-reportes", component:ReportesComponent},
  {path: "filtro-tareas", component: FiltroTareasComponent},
  {path: '', component: HomePageComponent},
  {path: "login", component: InicioSesionComponent},
  {path: "register", component: RegistroComponent},
  {path: "home", component: HomePageComponent}
];
