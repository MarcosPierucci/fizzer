import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";
import { Reporte } from '../../interfaces/reporte';
import { ReporteService } from '../../service/reporte.service';
import { RouterLink } from '@angular/router';

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


  listaReportes : Reporte[]= [

  ]


  aceptarReporte(tipoReporte : string, idAborrar : string|number)
  {
    if(tipoReporte.toLowerCase() == 'publicacion')
    {
      alert("Se apreto aceptar, tipo reporte: " + tipoReporte);
      this.borrarPublicacion(idAborrar); //Aca seria de tipo number porque la publicacion tendria un id de tipo number
    } else if(tipoReporte.toLowerCase() == 'perfil')
    {
      alert("Se apreto aceptar, tipo reporte: " + tipoReporte);
      this.borrarPerfil(idAborrar); //Aca seria de tipo string porque los usuarios tienen un id de tipo String
    }
  }

borrarPublicacion(id:number|any)
{
  //LOGICA DE BORRAR PUBLICACION (Necesito tener las publicaciones en el json para ver como lo hago)
}

borrarPerfil(id : string|any)
{
  //LOGICA DE BORRAR PERFIL (Necesito tener los perfiles en el json para ver como lo hago)
}



rechazarReporte(id:string)
{
this.rs.deleteReporte(id).subscribe(
  {
    next:() =>{
      console.log("Reporte rechazado borrado correctamente")
      window.location.reload();
    },
    error:(e:Error)=>
    {
      console.log("error en borrar")
      console.log(e.message);
    }
  }
)
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
