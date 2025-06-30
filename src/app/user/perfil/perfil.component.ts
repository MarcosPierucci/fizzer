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

  usuarioActivo: Usuario | undefined;
  publicaciones: Publicacion[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);
  //editar perfil - facu julio
  mostrarEditor: boolean = false;
  nuevoNombre: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService: PublicacionServiceService
  ) {}

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

  cargarPublicaciones(usuarioId: string): void {
    this.publicacionService.getPublicacionesByUsuarioId(usuarioId).subscribe({
      next: (publicaciones: Publicacion[]) => {
        this.publicaciones = publicaciones;
      },
      error: (err) => {
        console.error('Error al cargar publicaciones:', err);
      }
    });
  }

  // editar perfil - guardar cambios
  guardarCambios(): void {
    if (this.usuarioActivo && this.nuevoNombre.trim()) {
      const usuarioActualizado = { ...this.usuarioActivo, nombreUsario: this.nuevoNombre.trim() };
  
      this.usuarioService.putUsuario(usuarioActualizado, this.usuarioActivo.id!).subscribe({
        next: (usuarioActualizado) => {
          this.usuarioActivo = usuarioActualizado;
          this.mostrarEditor = false;
          console.log('Nombre actualizado correctamente');
        },
        error: (err) => {
          console.error('Error al actualizar el nombre:', err);
        }
      });
    }
  }
}
