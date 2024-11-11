import { Component } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";

@Component({
  selector: 'app-filtro-tareas',
  standalone: true,
  imports: [BarraVerdeAdminComponent],
  templateUrl: './filtro-tareas.component.html',
  styleUrl: './filtro-tareas.component.css'
})
export class FiltroTareasComponent {

}
