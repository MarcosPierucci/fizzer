import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioActivo } from '../interfaces/usuario';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

urlBase = 'http://localhost:3000/usuario'
private activeUserSubject = new BehaviorSubject<UsuarioActivo | undefined>(undefined);

constructor(private http: HttpClient) { }


  getTareas(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlBase);
    }
  
    getTareaById(id : string | null): Observable<Usuario>{
      return this.http.get<Usuario>(`${this.urlBase}/${id}`);
      }
  
    postTareas(tarea : Usuario): Observable<Usuario>{
      return this.http.post<Usuario>(this.urlBase, tarea);
    }
  
    putTareas(usuario: Usuario, id: string | null): Observable<Usuario>{
      return this.http.put<Usuario>(`${this.urlBase}/${id}`, usuario);
    }
  
    deleteTareas(id:string):Observable<void>{
      return this.http.delete<void>(`${this.urlBase}/${id}`);
    }
    

    login(nombreUsario: string, contraseniaUsario: string): Observable<boolean> {
      return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsario=${nombreUsario}`).pipe(
        map((usuarios) => {
          const usuario = usuarios.at(0);
          if (usuario && usuario.nombreUsario == nombreUsario && usuario.contraseniaUsuario == contraseniaUsario) {
            /* this.activeUser = { username: user.username, id: user.id! }; */
            this.activeUserSubject.next({ username: usuario.nombreUsario, id: usuario.idUsuario! });
            return true;
          }
          return false;
        }),
        catchError(() => of(false))
      );
    }


    logout(): Observable<boolean> {
      /* this.activeUser = undefined; */
      this.activeUserSubject.next(undefined);
      return of(true);
    }
  
    signup(usuario: Usuario): Observable<boolean> {
      return this.http.post<Usuario>(this.urlBase, usuario).pipe(
        map(({ idUsuario, nombreUsario }) => {
          if (idUsuario) {
            /* this.activeUser = { id, username }; */
            this.activeUserSubject.next({idUsuario, nombreUsario});
            return true;
          }
          return false;
        })
      );
    }

    auth(): Observable<UsuarioActivo | undefined> {
      return this.activeUserSubject.asObservable();}
    
      

}
