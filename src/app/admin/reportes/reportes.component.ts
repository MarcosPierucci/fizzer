import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";
import { Reporte } from '../../interfaces/reporte';
import { ReporteService } from '../../service/reporte.service';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [BarraVerdeAdminComponent, RouterLink],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  ngOnInit(): void {
    this.mostrarListaReportes();
  }

rs = inject(ReporteService);
us = inject(UsuarioService);


  listaReportes : Reporte[]= [

  ]

/*
  aceptarReporte(idReporte : string | undefined, idPublicacion: string | null) {
      this.banearPublicacion(idPublicacion, idReporte);
  }
*/


banearPublicacion(idReporte : string | undefined, idPublicacion : string|any)
{
  this.us.patchBaneadoPublicacion(idPublicacion, true).subscribe({
    next:()=>{
      console.log('Publicacion baneada correctamente')
      this.terminarReporte(idReporte)
    }, error:(e:Error)=>{
      console.log(e.message)
    }
  })
}



/*
rechazarReporte(id:string | undefined)
{
  this.terminarReporte(id);
  console.log("Reporte rechazado correctamente!");
}
*/

terminarReporte(id:string|undefined)
{
  this.rs.deleteReporte(id).subscribe({
    next:()=>{
      console.log("Reporte terminado correctamente!")
    }, error: ()=>{
      console.log("Error en el terminar reporte")
    }
  })

  /*
  this.rs.patchCerrarReporte(id, true).subscribe(
    {
      next:()=>{
        console.log("Cerrado correctamente")
        window.location.reload();
      },
      error: ()=>{
        console.log("Error al cerrar reporte")
      }
    }
  )
  */
}

mostrarListaReportes()
{
  this.rs.getReportes().subscribe(
    {
      next:(reporte : Reporte[])=>
      {
        this.listaReportes = reporte;
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
}



}
