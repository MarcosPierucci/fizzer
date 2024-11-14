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
  aceptarReporte(tipoReporte : string, idAbanear : string|number, idPublicacion : string|null|any)
  {
    console.log('tipoReporte:', tipoReporte, 'idAbanear:', idAbanear, 'idPublicacion:', idPublicacion);

    if(tipoReporte.toLowerCase() == 'publicacion')
    {
      alert("Se apreto aceptar, tipo reporte: " + tipoReporte);
      this.banearPublicacion(idAbanear, idPublicacion); //Aca seria de tipo number porque la publicacion tendria un id de tipo number
    } else if(tipoReporte.toLowerCase() == 'perfil')
    {
      this.banearPerfil(idAbanear); //Aca seria de tipo string porque los usuarios tienen un id de tipo String
    }
  }
  */

  aceptarReporte(tipoReporte: string,idReporte : string,  idAbanear: string | number, idPublicacion: string | null) {
    console.log('tipoReporte:', tipoReporte, 'idAbanear:', idAbanear, 'idPublicacion:', idPublicacion);

    if (tipoReporte.toLowerCase() === 'publicacion' && idPublicacion !== null) {
      alert("Se apretó aceptar, tipo reporte: " + tipoReporte);
      this.banearPublicacion(idPublicacion, idReporte);
    } else if (tipoReporte.toLowerCase() === 'perfil') {
      this.banearPerfil(idAbanear, idReporte);
     alert("Apretaste banear perfil")
    } else {
      console.error('ID de publicación no válido o no especificado');
    }
  }



banearPublicacion(idPublicacion : string|any, idReporte : string)
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


banearPerfil(id: number|any, idReporte : string) {
  this.us.patchBaneado(id, true).subscribe({
    next: () => {
      console.log('Usuario baneado exitosamente');
      this.terminarReporte(idReporte);
    },
    error: () => {
      console.log("Error en el baneado de perfil");
    }
  });
}


rechazarReporte(id:string)
{
  this.terminarReporte(id);
  console.log("Reporte rechazado correctamente!");
}


terminarReporte(id:string|number)
{
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
