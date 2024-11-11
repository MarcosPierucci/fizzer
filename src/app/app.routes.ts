import { Routes } from '@angular/router';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { FiltroTareasComponent } from './admin/filtro-tareas/filtro-tareas.component';

export const routes: Routes = [
  {path: "admin-reportes", component:ReportesComponent},
  {path: "filtro-tareas", component: FiltroTareasComponent}
];
