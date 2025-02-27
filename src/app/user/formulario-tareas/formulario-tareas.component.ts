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
  imports: [CommonModule, NgFor, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-tareas.component.html',
  styleUrls: ['./formulario-tareas.component.css'] // Corregido typo de `styleUrl`
})

export class FormularioTareasComponent implements OnInit {
  usuarioActivo: UsuarioActivo | undefined;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.auth().subscribe({
      next: (usuario: UsuarioActivo | undefined) => {
        if (usuario) this.usuarioActivo = usuario;
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
      complete: () => {
        console.log('Suscripción completada');
      },
    });
  }

  formularioTareas = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  servicioTarea = inject(TareaService);

  // Referencia a todas las categorías disponibles
  categorias = Object.values(Categoria);

  // Array para manejar las categorías seleccionadas
  categoriasSeleccionadas: Categoria[] = [];

  // Manejo del cambio de categorías (checkboxes)
  onCategoriaChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value as Categoria;

    if (checkbox.checked) {
      this.categoriasSeleccionadas.push(value);
    } else {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter((c) => c !== value);
    }
  }

  agregarTarea(): void {
    if (this.formularioTareas.invalid || this.categoriasSeleccionadas.length === 0) {
      alert('Por favor, complete todos los campos y seleccione al menos una categoría.');
      return;
    }

    const tareaNueva = this.formularioTareas.getRawValue();

    const tarea_nuevos_atributos: Tarea = {
      titulo: tareaNueva.titulo ?? '',
      descripcion: tareaNueva.descripcion ?? '',
      categorias: this.categoriasSeleccionadas, // Usa las categorías seleccionadas
      aceptada: false,
      creador: this.usuarioActivo?.nombre ?? 'Anónimo', // Retorna el nombre del usuario
    };

    this.agregarTareaBD(tarea_nuevos_atributos);
  }

  agregarTareaBD(tareaNueva: Tarea): void {
    this.servicioTarea.postTarea(tareaNueva).subscribe({
      next: () => alert('¡Gracias por tu participación!'),
      error: (err: Error) => {
        console.error('Error cargando tarea a la base de datos:', err.message);
      },
    });
  }
}
