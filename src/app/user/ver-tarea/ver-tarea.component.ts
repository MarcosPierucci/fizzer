import { Component, OnInit } from '@angular/core';
import { TareasGlobalesService } from '../../service/tareas-globales.service';
import { TareaGlobal } from '../../interfaces/tarea-Global';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-tarea',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-tarea.component.html',
  styleUrl: './ver-tarea.component.css'
})
export class VerTareaComponent implements OnInit {
  tareasGlobales: TareaGlobal[] = [];
  tareaDelDia?: TareaGlobal;

  constructor(private tareasGlobalesService: TareasGlobalesService) {}

  ngOnInit(): void {
    this.tareasGlobalesService.getTareasGlobales().subscribe({
      next: (data) => {
        this.tareasGlobales = data;
        this.definirTareaDelDia();
      },
      error: (err) => {
        console.error('Error al obtener tareas globales:', err);
      }
    });
  }

definirTareaDelDia(): void {
  const ahora = new Date();

  // Convertimos la hora local del navegador a Buenos Aires (UTC-3)
  const offsetBuenosAires = -3 * 60; // en minutos
  const ahoraBuenosAires = new Date(ahora.getTime() + (offsetBuenosAires - ahora.getTimezoneOffset()) * 60000);

  // Si aún no son las 15 hs en Buenos Aires, usamos la tarea de AYER
  if (ahoraBuenosAires.getHours() < 15) {
    ahoraBuenosAires.setDate(ahoraBuenosAires.getDate() - 1);
  }

  const inicio = new Date(2024, 0, 1); // 1 de enero de 2024
  const msEnUnDia = 24 * 60 * 60 * 1000;
  const diasPasados = Math.floor((ahoraBuenosAires.getTime() - inicio.getTime()) / msEnUnDia);

  const indice = diasPasados % this.tareasGlobales.length;

  // Guardamos la tarea del día
  this.tareaDelDia = this.tareasGlobales[indice];

  // Eliminamos la tarea del array
  this.tareasGlobales.splice(indice, 1);
}

}
