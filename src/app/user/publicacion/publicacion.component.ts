import { Component, inject, Injector, Input, OnInit } from '@angular/core';

import { UsuarioService } from '../../service/usuario.service';
import {Publicacion } from '../../interfaces/publicacion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { PublicacionServiceService } from '../../service/publicacion-service.service';


@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})

export class PublicacionComponent implements OnInit {

  @Input() publicacion: Publicacion = {} as Publicacion;


  likeAgregado = false; // Variable para controlar si el usuario ya dio Like
  puntoFizzerAgregado = false; 


  us = inject(UsuarioService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  servicioPublicacion = inject(PublicacionServiceService)

  ngOnInit(): void {
    const publicacionId = this.route.snapshot.paramMap.get('publicacionId') || '';
    const usuarioId = this.route.snapshot.paramMap.get('usuarioId') || '';
    console.log('Publicacion ID:', publicacionId);
    console.log('Usuario ID:', usuarioId);
  
    if (publicacionId && usuarioId) {
      this.buscarPublicacionId(publicacionId, usuarioId);
    }
  }
  
  buscarPublicacionId(publicacionId: string, usuarioId: string) {
    this.servicioPublicacion.getPublicacionById(publicacionId).subscribe({
      next: (publicacion: Publicacion) => {
        console.log("Publicacion conseguida correctamente");
  
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
  

  /*

  Usa servicio de usuario .-.
  
  buscarPublicacionId(publicacionId: string, usuarioId: string) 
  {
    this.us.getPubliacionbyId(publicacionId).subscribe({
      next: (publicacion: Publicacion) => {
        console.log("Publicacion conseguida correctamente");

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

  */


  reportarPublicacion() {
    const { id, nombreUsuario, link, idUsuario } = this.publicacion;
    const linkPublicacion = `/publicacion/${id}/usuario/${idUsuario}`;

    //para pasar datos
    this.router.navigate(['/formulario-reportes'], {
      queryParams: {
        reportado: nombreUsuario,
        link: linkPublicacion,
        idReportado: idUsuario,
        idPublicacionReportada: id
      }
    });
  }

  agregarLike() {
    if (!this.likeAgregado) {
      this.publicacion.likes++;
      this.likeAgregado = true; // Desactivar el botón después de dar Like
    }
  }

  agregarPuntoFizzer() {
    if (!this.puntoFizzerAgregado) {
      this.publicacion.puntosFizzer++;
      this.puntoFizzerAgregado = true; // Desactiva el botón después de dar Punto Fizzer
    }
  }

}



// import { Component, inject, OnInit } from '@angular/core';
// import { BarraVerdeUsuarioComponent } from "../barra-verde-usuario/barra-verde-usuario.component";
// import { UsuarioService } from '../../service/usuario.service';
// import {Publicacion } from '../../interfaces/publicacion';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule, NgFor } from '@angular/common';


// @Component({
//   selector: 'app-publicacion',
//   standalone: true,
//   imports: [BarraVerdeUsuarioComponent, FormsModule, CommonModule],
//   templateUrl: './publicacion.component.html',
//   styleUrls: ['./publicacion.component.css']
// })


// export class PublicacionComponent implements OnInit {

//   publicacion: Publicacion = {
//     id: '',
//     idUsuario: '',
//     link: '',
//     descripcion: '',
//     baneado: false,
//     nombreUsuario: '',
//     likes: 0,
//     puntosFizzer: 0,
//     urlFoto: ''
//   };

//   nuevoComentarioTexto: string = ''; // Nueva propiedad para almacenar el texto del comentario

//   us = inject(UsuarioService);
//   route = inject(ActivatedRoute);
//   router = inject(Router);

//   ngOnInit(): void {
//     const publicacionId = this.route.snapshot.paramMap.get('publicacionId') || '';
//     const usuarioId = this.route.snapshot.paramMap.get('usuarioId') || '';
//     console.log('Publicacion ID:', publicacionId);
//     console.log('Usuario ID:', usuarioId);

//     if (publicacionId && usuarioId) {
//       this.buscarPublicacionId(publicacionId, usuarioId);
//     }
//   }

//   buscarPublicacionId(publicacionId: string, usuarioId: string) {
//     this.us.getPubliacionbyId(publicacionId).subscribe({
//       next: (publicacion: Publicacion) => {
//         console.log("Publicacion conseguida correctamente");

//         console.log('ID:', publicacion.id);
//         console.log('ID Usuario:', publicacion.idUsuario);
//         console.log('Link:', publicacion.link);
//         console.log('Descripción:', publicacion.descripcion);
//         console.log('Baneado:', publicacion.baneado);
//         console.log('Nombre Usuario:', publicacion.nombreUsuario);

//         this.publicacion = publicacion;
//       },
//       error: () => {
//         console.log("Error al traer la publicacion");
//       }
//     });
//   }

//   reportarPublicacion() {
//     const { id, nombreUsuario, link, idUsuario } = this.publicacion;
//     const linkPublicacion = `/publicacion/${id}/usuario/${idUsuario}`;

//     //para pasar datos
//     this.router.navigate(['/formulario-reportes'], {
//       queryParams: {
//         reportado: nombreUsuario,
//         link: linkPublicacion,
//         idReportado: idUsuario,
//         idPublicacionReportada: id
//       }
//     });
//   }

//   agregarLike() {
//     this.publicacion.likes++;
//   }

//   agregarPuntoFizzer() {
//     this.publicacion.puntosFizzer++;
//   }

// }