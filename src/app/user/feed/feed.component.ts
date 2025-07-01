import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { UsuarioService, UsuarioActivo } from '../../service/usuario.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    PublicacionComponent
  ],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  publicaciones: Publicacion[] = [];
  currentUserId = '';          // valor por defecto
  private sub = new Subscription();

  constructor(
    private publicacionService: PublicacionServiceService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPublicaciones();

    this.sub.add(
      this.usuarioService
        .auth()
        .pipe(take(1))
        .subscribe((user: UsuarioActivo | undefined) => {
          this.currentUserId = user ? user.id.toString() : '';
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

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
}
