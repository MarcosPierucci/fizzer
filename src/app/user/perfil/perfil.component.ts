import { Component, inject, OnInit } from '@angular/core';
import { Usuario, UsuarioActivo } from '../../interfaces/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { Publicacion } from '../../interfaces/publicacion';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioActivo: Usuario | undefined;
  publicaciones: Publicacion[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  perfilUsuario!: Usuario;
  usuarioActual!: UsuarioActivo;
  isFollowing = false;

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionServiceService
  ) {}


  /*
  ngOnInit(): void {
    // Obtener el usuarioId desde la URL
    const usuarioId = this.route.snapshot.paramMap.get('id');

    if (usuarioId) {
      this.usuarioService.getUsuarioById(usuarioId).subscribe({
        next: (usuario: Usuario) => {
          this.usuarioActivo = usuario;
            if (usuario.id) {  // Verificamos que usuario.id no sea undefined
    this.cargarPublicaciones(usuario.id);
  } else {
    console.error("El usuario no tiene un ID válido.");
  }
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        }
      });
    } else {
      console.error('No se encontró el usuarioId en la URL.');
    }
  }
    */
   ngOnInit(): void {
  const perfilId = this.route.snapshot.paramMap.get('id')!;
  // 1) Cargo el usuario cuyo perfil se está viendo
  this.usuarioService.getUsuarioById(perfilId).subscribe(u => {
    this.perfilUsuario = u;

    // 2) Cargo quién está logueado
    this.usuarioService.auth().subscribe(act => {
      if (!act) return;
      this.usuarioActual = act;

      // 3) Compruebo si ya sigo a ese usuario
      this.isFollowing = this.perfilUsuario.seguidores.includes(act.id);

      // 4) Ya con todo listo, cargo sus publicaciones y logros
      this.cargarPublicaciones(perfilId);
    });
  },
  err => console.error('Error al obtener perfil:', err));
}

  cargarPublicaciones(usuarioId: string): void {
    this.publicacionService.getPublicacionesByUsuarioId(usuarioId).subscribe({
      next: (publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;

        // Calculamos el total de likes y de puntos: con `map` obtenemos la cantidad de likes o puntos de cada publicación,
        // y con `reduce` los sumamos todos para obtener el total acumulado del usuario.
      this.totalLikes = publicaciones
        .map(p => p.likes.length)
        .reduce((sum, l) => sum + l, 0);

      this.totalPuntos = publicaciones
        .map(p => p.puntosFizzer.length)
        .reduce((sum, p) => sum + p, 0);

      // Vemos si la cantidad de likes o puntos es mayor o igual a los niveles, sino devolvemos null
      this.logroLike = this.niveles.find(n => this.totalLikes >= n) || null;
      this.logroPunto = this.niveles.find(n => this.totalPuntos >= n) || null;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

  // niveles de logro disponibles, el readonly sirve para que la propiedad no pueda reasignarse después de su inicialización
readonly niveles = [100, 50, 20, 10, 3];

totalLikes = 0;
totalPuntos = 0;

// cantidad de alcanzado por puntos y likes (null si ninguno)
logroLike: number | null = null;
logroPunto: number | null = null;

toggleFollow() {
  const myId = this.usuarioActual.id;
  const arr = this.perfilUsuario.seguidores;
  const idx = arr.indexOf(myId);

  if (idx > -1) {
    // Si ya seguías, lo quito
    arr.splice(idx, 1);
    this.isFollowing = false;
  } else {
    // Si no seguías, lo agrego
    arr.push(myId);
    this.isFollowing = true;
  }

  // Patcheo la BD con el array actualizado
  this.usuarioService
    .patchFollowers(this.perfilUsuario.id!, arr)
    .subscribe({
      next: updated => {
        this.perfilUsuario = updated;
        console.log('Followers actualizados:', updated.seguidores);
      },
      error: err => console.error('Error al togglear follow:', err)
    });
}



}


