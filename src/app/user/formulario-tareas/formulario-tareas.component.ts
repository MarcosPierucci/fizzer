import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../enums/categoria';
import { CommonModule, NgFor } from '@angular/common';
import { TareaService } from '../../service/tarea.service'; 
import { Tarea } from '../../interfaces/tarea';
import { Usuario, UsuarioActivo } from '../../interfaces/usuario';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-formulario-tareas',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule,RouterLink],
  templateUrl: './formulario-tareas.component.html',
  styleUrl: './formulario-tareas.component.css'
})


export class FormularioTareasComponent implements OnInit {

  usuarioActivo: UsuarioActivo | undefined; 

  constructor(private usuarioService: UsuarioService) {}
  ngOnInit(): void {
    this.usuarioService.auth().subscribe({
      next: (usuario: UsuarioActivo | undefined) => {
          if(usuario)
          this.usuarioActivo = usuario; // Almacena la información del usuario
        },
        error: (err) => {
          console.error('Error al obtener el usuario:', err);
        },
        complete: () => {
          console.log('Suscripción completada');
        }
      });
    
  }

  formularioTareas = new FormGroup({
    'titulo' : new FormControl('', Validators.required),
    'descripcion': new FormControl('', Validators.required),
    'categoria': new FormControl('', Validators.required)
  })
  
  servicioTarea = inject(TareaService)

  // esto se crea para poder referenciar a todas las categorias del enum en el formulario
  categorias = Object.values(Categoria);

  agregarTarea(): void {
    if (this.formularioTareas.invalid) return;
    const tareaNueva = this.formularioTareas.getRawValue();
    
    const tarea_nuevos_atributos: Tarea = {
    id: this.servicioTarea.generarId(),
    titulo: tareaNueva.titulo ?? '',         
    descripcion: tareaNueva.descripcion ?? '',
    categoria: tareaNueva.categoria as Categoria ?? Categoria.Arte,
    aceptada: false,
    creador: this.usuarioActivo?.nombre //completar con un codigo que retorne el nombre del usuario
  } 
    
    this.agregarTareaBD(tarea_nuevos_atributos);
  }

  agregarTareaBD(tareaNueva: Tarea){
    this.servicioTarea.postTarea(tareaNueva).subscribe({
      next: (tarea)=> alert("GRACIAS POR TU PARTICIPACION"),
      error: (err: Error) => {console.log("Error cargando tarea a la base de datos: "+err.message)}
    })
  }


}
