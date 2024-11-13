import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../enums/categoria';
import { CommonModule, NgFor } from '@angular/common';
import { TareaService } from '../../service/tarea.service'; 
import { Tarea } from '../../interfaces/tarea';


@Component({
  selector: 'app-formulario-tareas',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
  templateUrl: './formulario-tareas.component.html',
  styleUrl: './formulario-tareas.component.css'
})
export class FormularioTareasComponent {

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
    creador: '' //completar con un codigo que retorne el nombre del usuario
  } 
    this.agregarTareaBD(tarea_nuevos_atributos);
  }

  agregarTareaBD(tareaNueva: Tarea){
    this.servicioTarea.postTarea(tareaNueva).subscribe({
      next: (tarea)=>console.log("Tarea: "+tareaNueva.titulo+" agregada exitosamente"),
      error: (err: Error) => {console.log("Error: "+err.message)}
    })
  }


}
