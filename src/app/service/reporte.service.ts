import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte } from '../interfaces/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  http = inject(HttpClient);
  urlBase : string = "http://localhost:3000/reporte"


  getReportes():Observable<Reporte[]>{
    return this.http.get<Reporte[]>(this.urlBase);
  }

  deleteReporte(id: string): Observable<void>{
    return this.http.delete<void>(`${this.urlBase}/${id}`);
  }

}
