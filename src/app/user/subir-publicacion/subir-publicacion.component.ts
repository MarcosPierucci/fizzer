import { Component, inject, OnInit } from '@angular/core';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioActivo } from '../../interfaces/usuario';
import { Publicacion } from '../../interfaces/publicacion';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-subir-publicacion',
  standalone: true,
  imports: [NgxDropzoneModule, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './subir-publicacion.component.html',
  styleUrls: ['./subir-publicacion.component.css']
})
export class SubirPublicacionComponent implements OnInit {

  usuarioActivo: UsuarioActivo | undefined = undefined;
  files: File[] = [];
  urlImg: string = "";

  fb = inject(FormBuilder);
  servicioPublicacion = inject(PublicacionServiceService);
  usuarioService = inject(UsuarioService);

  // Formulario para crear la publicación
  formularioPublicacion = this.fb.nonNullable.group({
    
    idUsuario: [this.usuarioActivo?.id],
    urlFoto: this.urlImg,
    descripcion: ["", Validators.minLength(5)],
    baneado: false,
    nombreUsuario: [this.usuarioActivo?.nombre],
    likes: 0,
    puntosFizzer: 0,
    link : ''
  });

  constructor() {}

  ngOnInit(): void {
    this.usuarioService.auth().subscribe({
      next: (usuario: UsuarioActivo | undefined) => {
        if (usuario) {
          this.usuarioActivo = usuario;
        } else {
          alert("Usuario no encontrado");
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
      complete: () => {
        console.log('Autenticación completada');
      }
    });



  }


  onSelect(event: any) {
    console.log('Archivos seleccionados:', event);
    this.files.push(...event.addedFiles);
  }


  onRemove(event: any) {
    console.log('Archivo removido:', event);
    this.files.splice(this.files.indexOf(event), 1);
  }


subirPublicacion() {

  if (this.files.length === 0) {
    alert('Por favor, selecciona una imagen para tu publicación.');
    return;
  }
  const fileData = this.files[0];
  const data = new FormData();

  data.append('file', fileData);
  data.append('upload_preset', 'cloudinary-fizzer');
  data.append('cloud_name', 'dolip28nf');

  this.servicioPublicacion.getUrl(data).subscribe({
    next: (url: string) => {
      this.urlImg = url; // Asignar la URL obtenida al atributo urlImg
      console.log('URL de la imagen subida:', this.urlImg);

      //Mover la lógica de `patchValue` dentro del callback para asegurar que `nuevaId` esté disponible
/*
      this.tamanioArregloPublicaciones((id: number) => {
        const nuevaId = id.toString();
        console.log("Nueva ID: " + nuevaId);


        //Actualizar los datos del formulario con la URL de la imagen y el nuevo id
        this.formularioPublicacion.patchValue({
          //id: nuevaId,
          urlFoto: this.urlImg,
          idUsuario: this.usuarioActivo?.id,
          nombreUsuario: this.usuarioActivo?.nombre,
          likes: 0,
          puntosFizzer: 0,
          baneado: false,
          link: ""
        });

        //Enviar la publicación al JSON server usando el método postPublicacion
        this.servicioPublicacion.postPublicacion(this.formularioPublicacion.value as Publicacion).subscribe({
          next: (response) => {
            console.log('Publicación creada con éxito:', response);
            alert('Publicación subida correctamente.');
            this.formularioPublicacion.reset(); //Limpiar el formulario
            this.files = []; //Limpiar los archivos seleccionados
          },
          error: (err) => {
            console.error('Error al crear la publicación:', err);
            alert('Hubo un error al crear la publicación.');
          }
        });
      }); */
      //Actualizar los datos del formulario con la URL de la imagen y el nuevo id
      this.formularioPublicacion.patchValue({
        //id: nuevaId,
        urlFoto: this.urlImg,
        idUsuario: this.usuarioActivo?.id,
        nombreUsuario: this.usuarioActivo?.nombre,
        likes: 0,
        puntosFizzer: 0,
        baneado: false,
        link: ""
      });

      //Enviar la publicación al JSON server usando el método postPublicacion
      this.servicioPublicacion.postPublicacion(this.formularioPublicacion.value as Publicacion).subscribe({
        next: (response) => {
          console.log('Publicación creada con éxito:', response);
          alert('Publicación subida correctamente.');
          this.formularioPublicacion.reset(); //Limpiar el formulario
          this.files = []; //Limpiar los archivos seleccionados
        },
        error: (err) => {
          console.error('Error al crear la publicación:', err);
          alert('Hubo un error al crear la publicación.');
        }
      });
    },
    error: (e: Error) => {
      console.error('Error al subir la imagen:', e);
      alert('Error al subir la imagen. Inténtalo de nuevo.');
    }
  });
}

  tamanioArregloPublicaciones(callback: (id: number) => void) {
    this.servicioPublicacion.getPublicacion().subscribe({
      next: (publicacion: Publicacion[]) => {
        const listaPublicaciones = publicacion;
        const id = listaPublicaciones.length + 1; // Calcula el id como tamaño del arreglo + 1
        callback(id); // Llama al callback pasando el id calculado
      },
      error: () => {
        console.log("Error al traer el arreglo de reportes");
      }
    });
  }

}
