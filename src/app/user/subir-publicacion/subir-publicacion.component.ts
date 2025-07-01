import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { of, switchMap, take } from 'rxjs';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';

import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { UsuarioService, UsuarioActivo } from '../../service/usuario.service';
import { Publicacion } from '../../interfaces/publicacion';

@Component({
  selector: 'app-subir-publicacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxDropzoneModule,
    RouterLink
  ],
  templateUrl: './subir-publicacion.component.html',
  styleUrls: ['./subir-publicacion.component.css']
})
export class SubirPublicacionComponent implements OnInit {
  usuarioActivo?: UsuarioActivo;
  files: File[] = [];
  urlImg = '';
  isEditing = false;
  editingId?: string;

  private fb = inject(FormBuilder);
  private servicioPublicacion = inject(PublicacionServiceService);
  private usuarioService = inject(UsuarioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formularioPublicacion = this.fb.nonNullable.group({
    //id: [''],
    idUsuario: [''],
    urlFoto: ['', Validators.required],
    descripcion: ['', Validators.minLength(5)],
    baneado: false,
    nombreUsuario: [''],
    likes: [[] as string[]],
    puntosFizzer: [[] as string[]],
    link: ['']
  });

  ngOnInit(): void {
    // Cargo usuario activo
    this.usuarioService.auth().pipe(take(1)).subscribe(u => {
      if (u) {
        this.usuarioActivo = u;
        this.formularioPublicacion.patchValue({
          idUsuario: u.id,
          nombreUsuario: u.nombre
        });
      }
    });

    // Compruebo si es edición
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.editingId = id;
      this.servicioPublicacion.getPublicacionById(id)
        .subscribe(pub => {
          this.formularioPublicacion.patchValue({
            ...pub
          });
        });
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(file: File): void {
    this.files = this.files.filter(f => f !== file);
  }

  subirPublicacion(): void {
    // Fallback a URL existente
    const currentUrl = this.formularioPublicacion.value.urlFoto!;
    const upload$ = this.files.length
      ? this.servicioPublicacion.getUrl(this.buildFormData())
      : of(currentUrl);

    upload$.pipe(
      switchMap((url: string) => {
        this.urlImg = url;
        // Construyo el objeto Publicacion con casting seguro
        const datosForm = this.formularioPublicacion.value;
        const pub = {
          ...datosForm,
          urlFoto: this.urlImg,
          idUsuario: this.usuarioActivo!.id,
          nombreUsuario: this.usuarioActivo!.nombre
        } as unknown as Publicacion;

        return this.isEditing
          ? this.servicioPublicacion.putPublicacion(pub, this.editingId!)
          : this.servicioPublicacion.postPublicacion(pub);
      })
    ).subscribe({
      next: () => {
        alert(this.isEditing ? 'Publicado actualizado.' : 'Publicado creado.');
        this.router.navigate(['/home']);
      },
      error: e => {
        console.error(e);
        alert('Hubo un error al guardar la publicación.');
      }
    });
  }

  private buildFormData(): FormData {
    const data = new FormData();
    data.append('file', this.files[0]);
    data.append('upload_preset', 'cloudinary-fizzer');
    data.append('cloud_name', 'dolip28nf');
    return data;
  }
}