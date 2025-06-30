// PERFIL COMPONENT FINAL COMBINADO
import { Component, inject, OnInit } from '@angular/core';
import { Usuario, UsuarioActivo } from '../../interfaces/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { Publicacion } from '../../interfaces/publicacion';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // Datos principales
  perfilUsuario!: Usuario; // usuario cuyo perfil estamos viendo
  usuarioActual!: UsuarioActivo; // usuario logueado
  publicaciones: Publicacion[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Seguimiento
  isFollowing = false;

  // Edición de perfil
  mostrarEditarNombre = false;
  mostrarEditarPassword = false;
  nuevoNombre = '';
  nuevaContrasenia = '';
  confirmarContrasenia = '';

  // Logros
  readonly niveles = [100, 50, 20, 10, 3];
  totalLikes = 0;
  totalPuntos = 0;
  logroLike: number | null = null;
  logroPunto: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionServiceService
  ) {}

  ngOnInit(): void {
    const perfilId = this.route.snapshot.paramMap.get('id')!;

    this.usuarioService.getUsuarioById(perfilId).subscribe({
      next: (perfil) => {
        this.perfilUsuario = perfil;

        this.usuarioService.auth().subscribe((usuarioLogueado) => {
          if (!usuarioLogueado) return;
          this.usuarioActual = usuarioLogueado;

          this.isFollowing = perfil.seguidores.includes(usuarioLogueado.id);

          this.cargarPublicaciones(perfil.id!);
        });
      },
      error: err => console.error('Error al obtener perfil:', err)
    });
  }

  cargarPublicaciones(usuarioId: string): void {
    this.publicacionService.getPublicacionesByUsuarioId(usuarioId).subscribe({
      next: (publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;

        this.totalLikes = publicaciones.map(p => p.likes.length).reduce((a, b) => a + b, 0);
        this.totalPuntos = publicaciones.map(p => p.puntosFizzer.length).reduce((a, b) => a + b, 0);

        this.logroLike = this.niveles.find(n => this.totalLikes >= n) || null;
        this.logroPunto = this.niveles.find(n => this.totalPuntos >= n) || null;
      },
      error: err => console.error('Error al cargar publicaciones:', err)
    });
  }

  toggleFollow() {
    const myId = this.usuarioActual.id;
    const arr = this.perfilUsuario.seguidores;
    const idx = arr.indexOf(myId);

    if (idx > -1) {
      arr.splice(idx, 1);
      this.isFollowing = false;
    } else {
      arr.push(myId);
      this.isFollowing = true;
    }

    this.usuarioService.patchFollowers(this.perfilUsuario.id!, arr).subscribe({
      next: updated => this.perfilUsuario = updated,
      error: err => console.error('Error al actualizar seguidores:', err)
    });
  }

  guardarNuevoNombre() {
    if (!this.nuevoNombre.trim()) return alert('Por favor completá el nuevo nombre.');

    const usuarioActualizado = {
      ...this.perfilUsuario,
      nombreUsario: this.nuevoNombre.trim()
    };

    this.usuarioService.putUsuario(usuarioActualizado, usuarioActualizado.id!).subscribe({
      next: (usuario) => {
        this.perfilUsuario = usuario;
        this.nuevoNombre = '';
        this.mostrarEditarNombre = false;
        alert('Nombre de usuario actualizado.');
      },
      error: (err) => alert('Error al actualizar el nombre.')
    });
  }

  guardarNuevaContrasenia() {
    if (!this.nuevaContrasenia.trim() || !this.confirmarContrasenia.trim())
      return alert('Por favor completá ambos campos de contraseña.');

    if (this.nuevaContrasenia !== this.confirmarContrasenia)
      return alert('Las contraseñas no coinciden.');

    const usuarioActualizado = {
      ...this.perfilUsuario,
      contraseniaUsuario: this.nuevaContrasenia.trim()
    };

    this.usuarioService.putUsuario(usuarioActualizado, usuarioActualizado.id!).subscribe({
      next: (usuario) => {
        this.perfilUsuario = usuario;
        this.nuevaContrasenia = '';
        this.confirmarContrasenia = '';
        this.mostrarEditarPassword = false;
        alert('Contraseña actualizada.');
      },
      error: (err) => alert('Error al actualizar la contraseña.')
    });
  }
}
