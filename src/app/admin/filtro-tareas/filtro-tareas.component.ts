import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";
import { Tarea } from '../../interfaces/tarea';
import { TareaService } from '../../service/tarea.service';

@Component({
  selector: 'app-filtro-tareas',
  standalone: true,
  imports: [BarraVerdeAdminComponent],
  templateUrl: './filtro-tareas.component.html',
  styleUrl: './filtro-tareas.component.css'
})
export class FiltroTareasComponent implements OnInit{
ngOnInit(): void {
  this.mostrarListadoTareas();
}


ts = inject(TareaService)




listaTareasPorFiltar : Tarea[]=[

]


aceptarTarea(id: string) {
  this.ts.patchTareaAceptada(id, true).subscribe({next:() => {
    const tarea = this.listaTareasPorFiltar.find(t => t.id === id);
    if (tarea) {
      console.log("Tarea aceptada")
      tarea.aceptada = true;
    }}, error:(e:Error) =>
    {
      console.log(e.message)
    }
  });
}






rechazarTarea(id:string){
  this.ts.deleteTarea(id).subscribe(
    {
      next:()=>{
        window.location.reload();
      },
      error:(e:Error)=>{
        console.log(e.message);
      }
    }
  )
}


mostrarListadoTareas()
{
this.ts.getTareas().subscribe({
  next:(tarea : Tarea[]) =>
  {
    this.listaTareasPorFiltar = tarea;
  },
  error: (e:Error) =>
  {
      console.log(e.message);
  }
})
}



}
