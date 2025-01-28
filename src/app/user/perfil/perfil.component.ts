import { Component, inject, OnInit } from '@angular/core';
import { UsuarioActivo } from '../../interfaces/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { Publicacion } from '../../interfaces/publicacion';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioActivo: UsuarioActivo | undefined;
  publicaciones: Publicacion[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionServiceService
  ) {}

  router = inject(Router);

  ngOnInit(): void {
    // Obtener el usuario activo
    this.usuarioService.auth().subscribe({
      next: (usuario: UsuarioActivo | undefined) => {
        if (usuario) {
          this.usuarioActivo = usuario;

        if(usuario)
        this.usuarioActivo = usuario; // Almacena la información del usuario
          // Si el usuario existe, cargar sus publicaciones
          this.cargarPublicaciones(usuario.id);
        }

      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
      complete: () => {
        console.log('Suscripción completada');
      }
    });
  }

  cargarPublicaciones(usuarioId: string): void {
    // Obtener publicaciones del usuario por su id
    this.publicacionService.getPublicacionesByUsuarioId(usuarioId).subscribe({
      next: (publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;
        this.calcularCantLikes();
        this.calcularCantPuntos();
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

cantLikes : number=0;
cantPuntos : number =0;

calcularCantLikes()
{
  //la funcion reduce permite recorrer el arreglo y acumular un valor, en este caso, la suma de likes, en una sola operación.
  this.cantLikes = this.publicaciones.reduce((total, publicacion) => total + (publicacion.likes || 0), 0);
}

calcularCantPuntos() {
  this.cantPuntos = this.publicaciones.reduce((total, publicacion) => total + (publicacion.puntosFizzer || 0), 0);
}

}
