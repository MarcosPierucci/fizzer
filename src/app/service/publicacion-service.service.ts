import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionServiceService {

  urlCloudinary : string = "https://api.cloudinary.com/v1_1/dolip28nf/image/upload"
  urlBase : string = 'http://localhost:3000/publicaciones'



  constructor(private http: HttpClient ) {}

  getPublicacion(): Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(this.urlBase);
    }

    getPublicacionById(id : string | null): Observable<Publicacion>{
      return this.http.get<Publicacion>(`${this.urlBase}/${id}`);
      }

    postPublicacion(publicacion : Publicacion): Observable<Publicacion>{
      return this.http.post<Publicacion>(this.urlBase, publicacion);
    }

    putPublicacion(publicacion: Publicacion, id: string | null): Observable<Publicacion>{
      return this.http.put<Publicacion>(`${this.urlBase}/${id}`, publicacion);
    }

    deletePublicacion(id:string):Observable<void>{
      return this.http.delete<void>(`${this.urlBase}/${id}`);
    }

  uploadImg (data : any): Observable <any>{
  return this.http.post(this.urlCloudinary,data)
  }

  getUrl(data: any): Observable<string> {
    return this.uploadImg(data).pipe(
      map((response: any) => response.secure_url) // Extraemos el 'secure_url' de la respuesta
    );
  }

  getPublicacionesByUsuarioId(usuarioId: string): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(`${this.urlBase}?idUsuario=${usuarioId}`);
  }
  



  
}
