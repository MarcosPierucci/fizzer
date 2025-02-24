import { Component, OnInit } from '@angular/core';
import { TareasGlobalesService } from '../../service/tareas-globales.service';
import { TareaGlobal } from '../../interfaces/tarea-Global';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-tarea',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './ver-tarea.component.html',
  styleUrl: './ver-tarea.component.css'
})
export class VerTareaComponent  implements OnInit{
  tareasGlobales: TareaGlobal[] = [];

  constructor(private tareasGlobalesService: TareasGlobalesService) {}

  ngOnInit(): void {
    this.obtenerTareasGlobales();
  }

  obtenerTareasGlobales(): void {
    this.tareasGlobalesService.getTareaGlobal().subscribe({
      next: (data) => {
        this.tareasGlobales = data;
      },
      error: (err) => {
        console.error('Error al obtener tareas globales:', err);
      }
    });
  }


}
