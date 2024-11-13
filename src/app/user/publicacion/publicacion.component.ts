/*import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeUsuarioComponent } from "../barra-verde-usuario/barra-verde-usuario.component";
import { UsuarioService } from '../../service/usuario.service';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [BarraVerdeUsuarioComponent],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent implements OnInit{
ngOnInit(): void {

}

publicacion : Publicacion = {
  id: '',
  idUsuario : '',
  link: '',
  descripcion : '',
  baneado : false,
  nombreUsuario : ''
}


us = inject(UsuarioService);

buscarPublicacionId(publicacionId :string, usuarioId:string)
{
  this.us.getPubliacionbyId(publicacionId, usuarioId).subscribe({
    next: (publicacion : Publicacion) =>
    {
        this.publicacion = publicacion
    }, error:()=>{
        console.log("Erorr al traer la publicacion")
    }
  })
}

}
*/

import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeUsuarioComponent } from "../barra-verde-usuario/barra-verde-usuario.component";
import { UsuarioService } from '../../service/usuario.service';
import { Publicacion } from '../../interfaces/publicacion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [BarraVerdeUsuarioComponent],
  templateUrl: './publicacion.component.html',
  styleUrl: './publicacion.component.css'
})
export class PublicacionComponent implements OnInit {

  publicacion: Publicacion = {
    id: '',
    idUsuario: '',
    link: '',
    descripcion: '',
    baneado: false,
    nombreUsuario: ''
  };

  us = inject(UsuarioService);
  route = inject(ActivatedRoute);
  router = inject(Router);



ngOnInit(): void {
  const publicacionId = this.route.snapshot.paramMap.get('publicacionId') || '';
  const usuarioId = this.route.snapshot.paramMap.get('usuarioId') || '';
  console.log('Publicacion ID:', publicacionId);
  console.log('Usuario ID:', usuarioId);

  if (publicacionId && usuarioId) {
    this.buscarPublicacionId(publicacionId, usuarioId);
  }
}

/*
    buscarPublicacionId(publicacionId: string, usuarioId: string) {
      this.us.getPubliacionbyId(publicacionId, usuarioId).subscribe({
        next: (publicacion: Publicacion) => {
          this.publicacion = publicacion;
        },
        error: () => {
          console.log("Error al traer la publicacion");
        }
      });
    }*/

      buscarPublicacionId(publicacionId: string, usuarioId: string) {
        this.us.getPubliacionbyId(publicacionId).subscribe({
          next: (publicacion: Publicacion) => {
            console.log("Publicacion conseguida correctamente")

            console.log('ID:', publicacion.id);
            console.log('ID Usuario:', publicacion.idUsuario);
            console.log('Link:', publicacion.link);
            console.log('Descripción:', publicacion.descripcion);
            console.log('Baneado:', publicacion.baneado);
            console.log('Nombre Usuario:', publicacion.nombreUsuario);

            this.publicacion = publicacion;
          },
          error: () => {
            console.log("Error al traer la publicacion");
          }
        });
      }


      reportarPublicacion() {
        const { id, nombreUsuario, link, idUsuario } = this.publicacion;

        // Redirigir al formulario de reportes pasando los datos como query parameters
        this.router.navigate(['/formulario-reportes'], {
          queryParams: {
            reportado: nombreUsuario,
            link: link,
            idReportado: idUsuario,
            idPublicacionReportada: id
          }
        });
      }
}

