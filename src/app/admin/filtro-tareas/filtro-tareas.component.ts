import { Component, inject, OnInit } from '@angular/core';
import { BarraVerdeAdminComponent } from "../barra-verde-admin/barra-verde-admin.component";
import { Tarea } from '../../interfaces/tarea';
import { TareaService } from '../../service/tarea.service';
import { TareasGlobalesService } from '../../service/tareas-globales.service';
import { TareaGlobal } from '../../interfaces/tarea-Global';

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
tgs = inject(TareasGlobalesService)




listaTareasPorFiltar : Tarea[]=[

]


aceptarTarea(tarea : Tarea) {

  const tareaGlobal :TareaGlobal = {
    id: tarea.id,
    usada: false,
    descripcion: tarea.descripcion,
    titulo: tarea.titulo
  };

  this.mandarAglobales(tareaGlobal);

  this.borrarTarea(tarea.id);

}

mandarAglobales(tareaGlobal : TareaGlobal)
{
this.tgs.postTareaGlobal(tareaGlobal).subscribe({
  next:(tarea:TareaGlobal)=>{
    console.log("Tarea global guardada correctamente")
  }, error:()=>{
    console.log("Error en el mandarAglobales")
  }
})
}






borrarTarea(id : string | undefined)
{
  this.ts.deleteTarea(id).subscribe(
    {
      next:()=>{
        //Esto lo tenemos que borrar
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
