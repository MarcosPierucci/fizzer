import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PublicacionServiceService } from '../../service/publicacion-service.service';

@Component({
  selector: 'app-subir-publicacion',
  standalone: true,
  imports: [NgxDropzoneModule],
  templateUrl: './subir-publicacion.component.html',
  styleUrl: './subir-publicacion.component.css'
})
export class SubirPublicacionComponent {
  
  files: File[] = [];
  urlImg :string ="";

  constructor (private publicacionService : PublicacionServiceService){}


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upLoadImg() {
    if (this.files.length === 0) return false;

    const fileData = this.files[0];
    const data = new FormData();

    data.append('file', fileData);
    data.append('upload_preset', 'cloudinary-fizzer');
    data.append('cloud_name', 'dolip28nf');

    // Usamos el método getUrl del servicio para obtener la URL de la imagen
    this.publicacionService.getUrl(data).subscribe({
      next: (url: string) => {
        this.urlImg = url; // Asignar la URL al atributo urlImg
        console.log('URL de la imagen subida:', this.urlImg);
      },
      error: (e: Error) => {
        console.error('Error al subir la imagen:', e);
      }
    });

    return true;
  }





}
