import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../interfaces/tarea';
import { TareaService } from '../../service/tarea.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario, UsuarioActivo } from '../../interfaces/usuario';

@Component({
  selector: 'app-votaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})

export class VotacionesComponent implements OnInit {

  tareas: Tarea[] = [];
  tareasVotadas: Set<string> = new Set(); // usamos un Set para almacenar los IDs de tareas que ya fueron votadas
 
  usuarioVotando: UsuarioActivo | undefined

  constructor(private tareasService: TareaService, private servicioUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (tareasRecuperadas: Tarea[]) => {
        this.tareas = tareasRecuperadas;
        console.log("Tareas globales recuperadas exitosamente!");
      },
      error: (e: Error) => console.log("Error recuperando las tareas globales: " + e)
    });
  }

  votar(tareaId: string): void {
    console.log("Votando...");
    
    this.servicioUsuario.auth().subscribe({
      next: (usuarioActivo: UsuarioActivo | undefined) => {
        this.usuarioVotando = usuarioActivo;
        console.log("Usuario que vota: " + usuarioActivo?.nombre);
  
        if (!this.usuarioVotando?.id) {
          console.log("No se encontró usuario activo.");
          return;
        }
  
        const tarea = this.tareas.find(t => t.id === tareaId);
        if (tarea) {
          console.log("Tarea siendo votada: " + tarea.titulo);
  
          if (!tarea.idsVotadores.includes(this.usuarioVotando.id)) {
            tarea.votaciones++;
            tarea.idsVotadores.push(this.usuarioVotando.id); // sgregamos el ID del usuario a los votadores
  
            this.tareasService.putTarea(tarea, tareaId).subscribe({
              next: () => console.log("Voto registrado con éxito"),
              error: (err: Error) => console.error("Error al actualizar la tarea:", err.message),
            });
          } else {
            console.log("El usuario ya votó esta tarea.");
          }
        }
      },
      error: (e: Error) => console.log("Error: usuario no detectado: " + e),
    });
  }
  

  hasVoted(tareaId: string): boolean {
    const tarea = this.tareas.find(t => t.id === tareaId);
    return tarea ? tarea.idsVotadores.includes(this.usuarioVotando?.id || '') : false;
  }
  
}
