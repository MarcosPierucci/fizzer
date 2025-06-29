import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tarea } from '../interfaces/tarea';
import { Categoria } from '../enums/categoria';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor() { }
  http = inject(HttpClient);
  urlBase = 'http://localhost:3000/tareas'
  private contadorId: number = 0;

  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.urlBase);
  }

  getTareaById(id: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.urlBase}/${id}`);
  }

  getTareasByCategoria(categoriaBuscar: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.urlBase).pipe(
      map((tareas) => 
        // filtro todas las tareas donde su atributo categoria contiene la categoriaBuscar
        tareas.filter((tarea) => tarea.categorias.includes(categoriaBuscar as Categoria)) // si o si tengo que castear porque sino tira error al reconocer string
      )
    );
  }
  
  deleteTarea(id: string | undefined): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }

  postTarea(tarea : Tarea): Observable<Tarea>{
    return this.http.post<Tarea>(this.urlBase, tarea);
  }

  putTarea(tarea: Tarea, id: string): Observable<Tarea>{
    return this.http.put<Tarea>(`${this.urlBase}/${id}`, tarea);
  }

  patchTareaAceptada(id: string | undefined, aceptada: boolean): Observable<Tarea> {
    return this.http.patch<Tarea>(`${this.urlBase}/${id}`, { aceptada });
  }

  generarId(): string {
    this.contadorId++;
    return 'id-' + this.contadorId.toString();
  }





}
