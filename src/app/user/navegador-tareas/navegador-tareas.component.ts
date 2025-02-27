import { Component, OnInit, Testability } from '@angular/core';
import { TareaService } from '../../service/tarea.service';
import { Tarea } from '../../interfaces/tarea';
import { Categoria } from '../../enums/categoria';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegador-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navegador-tareas.component.html',
  styleUrls: ['./navegador-tareas.component.css']
})

export class NavegadorTareasComponent implements OnInit {
  tareas: Tarea[] = [];
  categorias = Object.values(Categoria); // Todas las categorías del enum
  categoriasSeleccionadas: string[] = [] // Categoría seleccionada para filtrar

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(){
    if (this.categoriasSeleccionadas.length > 0) {
      // esto es para limpiar la lista y empezar de cero
      this.tareas = [];

      this.categoriasSeleccionadas.forEach((categoria) => {
        this.tareaService.getTareasByCategoria(categoria).subscribe({
          next: (tareasFiltradas) => {
            console.log("Categoria analizada: "+categoria)
            tareasFiltradas.forEach((tarea) => {
              console.log("Tarea: "+tarea.titulo+" Categoria: "+tarea.categorias)
              // para evitar duplicados al agregar tareas, analizo el ID de cada tarea antes de agregar
              if (!this.tareas.some((t) => t.id === tarea.id)) {
                this.tareas.push(tarea);
              } 
            });
          },
          error: (err) => {
            console.error(`Error al cargar tareas de la categoría "${categoria}":`, err);
          }
        });
      });
    } else {
      this.tareaService.getTareas().subscribe({
        next: (todasLasTareas) => {
          console.log("Se cargaron todas las tareas!")
          this.tareas = todasLasTareas;
        },
        error: (err) => {
          console.error('Error al cargar todas las tareas:', err);
        }
      });
    }
  }

  eventoCheckboxCategoria(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (inputElement.checked) {
      this.categoriasSeleccionadas.push(value);
    } else {
      // Eliminar categoría si está desmarcada
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(
        (categoria) => categoria !== value
      );
    }

    console.log("Categorias seleccionadas: "+this.categoriasSeleccionadas)
  }

  buscar(){
    this.cargarTareas()
  }


}
