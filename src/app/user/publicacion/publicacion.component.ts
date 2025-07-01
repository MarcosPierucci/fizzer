import { Component, inject, Injector, Input, OnInit } from '@angular/core';
import { UsuarioActivo } from '../../interfaces/usuario'
import { UsuarioService } from '../../service/usuario.service';
import {Publicacion } from '../../interfaces/publicacion';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { Subscription, take } from 'rxjs';


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

  usuarioActivo: UsuarioActivo | undefined;

  us = inject(UsuarioService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  usuarioService = inject(UsuarioService)
  servicioPublicacion = inject(PublicacionServiceService)
  publicacionService = inject(PublicacionServiceService)
  publicaciones: Publicacion[] = [];
  currentUserId = '';      
  private sub = new Subscription();
      // valor por defecto
  



  ngOnInit(): void {
    const publicacionId = this.route.snapshot.paramMap.get('publicacionId') || '';
    const usuarioId = this.route.snapshot.paramMap.get('usuarioId') || '';


    if (publicacionId && usuarioId) {
      this.buscarPublicacionId(publicacionId, usuarioId);
    }

  

  this.us.auth().subscribe(usuario => {
  if (!usuario) return;
  this.usuarioActivo = usuario;
  this.likeAgregado = this.publicacion.likes.includes(usuario.id);
  this.puntoFizzerAgregado = this.publicacion.puntosFizzer.includes(usuario.id);

  

});

this.sub.add(
      this.usuarioService
        .auth()
        .pipe(take(1))
        .subscribe((user: UsuarioActivo | undefined) => {
          this.currentUserId = user ? user.id.toString() : '';
        })
    );
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


/*
agregarLike() {
  const userId = this.usuarioActivo?.id;
  if (!userId || this.likeAgregado) return;

  this.publicacion.likes.push(userId);
  this.likeAgregado = true;

  this.servicioPublicacion.patchLikes(
    this.publicacion.id!,
    this.publicacion.likes
  ).subscribe();
}
*/

toggleLike() {
  const userId = this.usuarioActivo?.id;
  if (!userId) return;

  const idx = this.publicacion.likes.indexOf(userId);
  if (idx > -1) {
    // si ya estaba, lo saco
    this.publicacion.likes.splice(idx, 1);
    this.likeAgregado = false;
  } else {
    // si no estaba, lo agrego
    this.publicacion.likes.push(userId);
    this.likeAgregado = true;
  }

  // siempre patch con el array completo
  this.servicioPublicacion.patchLikes(
    this.publicacion.id!,
    this.publicacion.likes
  ).subscribe({
    next: (updated) =>
      {
        this.publicacion = updated;
        console.log("Like toggled correctamente")
      },
    error: () => console.log("Error al togglear like")
  });
}


/*
agregarPuntoFizzer() {
  const userId = this.usuarioActivo?.id;
  if (!userId || this.puntoFizzerAgregado) return;

  this.publicacion.puntosFizzer.push(userId);
  this.puntoFizzerAgregado = true;

  this.servicioPublicacion.patchPuntosFizzer(
    this.publicacion.id!,
    this.publicacion.puntosFizzer
  ).subscribe();
}
*/

togglePuntoFizzer() {
  const userId = this.usuarioActivo?.id;
  if (!userId) return;

  const idx = this.publicacion.puntosFizzer.indexOf(userId);
  if (idx > -1) {
    this.publicacion.puntosFizzer.splice(idx, 1);
    this.puntoFizzerAgregado = false;
  } else {
    this.publicacion.puntosFizzer.push(userId);
    this.puntoFizzerAgregado = true;
  }

  this.servicioPublicacion.patchPuntosFizzer(
    this.publicacion.id!,
    this.publicacion.puntosFizzer
  ).subscribe({
    next: (updated) => {
      this.publicacion = updated;
    console.log("Punto Fizzer toggled correctamente")
    }
    ,
    error: () => console.log("Error al togglear Punto Fizzer")
  });
}

//ultimos

  loadPublicaciones(): void {
    this.publicacionService.getPublicacion()
      .subscribe(data => this.publicaciones = data);
  }

  onEditar(id: string): void {
    this.router.navigate(['/editar-publicacion', id]);
  }

  onBorrar(id: string): void {
    if (!confirm('¿Querés eliminar esta publicación?')) return;
    this.publicacionService.deletePublicacion(id)
      .subscribe(() => this.loadPublicaciones());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}


