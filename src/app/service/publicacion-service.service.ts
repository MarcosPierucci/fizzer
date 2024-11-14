import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionServiceService {

  urlCloudinary : string = "https://api.cloudinary.com/v1_1/dolip28nf/image/upload"


  constructor(private http: HttpClient ) {}


  uploadImg (data : any): Observable <any>{
  return this.http.post(this.urlCloudinary,data)
  }

  getUrl(data: any): Observable<string> {
    return this.uploadImg(data).pipe(
      map((response: any) => response.secure_url) // Extraemos el 'secure_url' de la respuesta
    );
  }





  
}
