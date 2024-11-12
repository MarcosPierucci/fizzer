import { inject, Injectable } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tares: Tarea[] = []
  http = inject(HttpClient)
  urlBase = "link"
  private contadorId: number = 0;

  getTarea(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.urlBase);
  }

  getTareaById(id: string | null): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.urlBase}/${id}`)
  }

  postTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.urlBase, tarea)
  }

  deleteTarea(id: string | undefined): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.urlBase}/${id}`)
  }

  updateTarea(id: string | null, product: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.urlBase}/${id}`, product);
  } 

  generarId(): string {
    this.contadorId++;
    return 'id-' + this.contadorId.toString();
  }

}
