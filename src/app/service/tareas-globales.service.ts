import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TareaGlobal } from '../interfaces/tarea-Global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasGlobalesService {

  constructor() { }
  http = inject(HttpClient);
  urlBase = 'http://localhost:3000/tareasGlobales'



  postTareaGlobal(tarea : TareaGlobal): Observable<TareaGlobal>{
    return this.http.post<TareaGlobal>(this.urlBase, tarea);
  }

  getTareasGlobales(): Observable<TareaGlobal[]>{
    return this.http.get<TareaGlobal[]>(this.urlBase);
    }

    
}
