import { Reporte } from './../interfaces/reporte';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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

  postReporte(reporte : Reporte): Observable<Reporte>{
    return this.http.post<Reporte>(this.urlBase, reporte);
  }

  putReporte(reporte: Reporte, id: string): Observable<Reporte>{
    return this.http.put<Reporte>(`${this.urlBase}/${id}`, reporte);
  }


}
