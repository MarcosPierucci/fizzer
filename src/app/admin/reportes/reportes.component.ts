import { Component } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";
import { Reporte } from '../../interfaces/reporte';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [BarraVerdeAdminComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {


  listaReportes : Reporte[]= [

  ]
}
