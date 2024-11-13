import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioActivo } from '../interfaces/usuario';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { Publicacion } from '../interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

urlBase = 'http://localhost:3000/usuario'
urlBase2 = 'http://localhost:3000/publicaciones'

private activeUserSubject = new BehaviorSubject<UsuarioActivo | undefined>(undefined);

constructor(private http: HttpClient) { }

/*Che, hay que ver porque pusimos en todos con tarea si estamos en usuario, y ver que no se rompa nada cuando lo cambiemos*/
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

    patchBaneado(id: number, baneado: boolean): Observable<any> {
      return this.http.patch(`${this.urlBase}/${id}`, { baneado });
    }

/*
getPubliacionbyId(publicacionId: string, usuarioId: string): Observable<Publicacion> {
  return this.http.get<Publicacion>(`${this.urlBase}/${usuarioId}/publicaciones/${publicacionId}`);
}*/

getPubliacionbyId(publicacionId: string): Observable<Publicacion> {
  return this.http.get<Publicacion>(`${this.urlBase2}/${publicacionId}`);
}













    // login(nombreUsario: string, contraseniaUsario: string): Observable<boolean> {
    //   return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsario=${nombreUsario}`).pipe(
    //     map((usuarios) => {
    //       const usuario = usuarios.at(0);
    //       if (usuario && usuario.nombreUsario == nombreUsario && usuario.contraseniaUsuario == contraseniaUsario) {
    //         /* this.activeUser = { username: user.username, id: user.id! }; */
    //         this.activeUserSubject.next({ nombre: usuario.nombreUsario, id: usuario.idUsuario! });
    //         return true;
    //       }
    //       return false;
    //     }),
    //     catchError(() => of(false))
    //   );
    // }

    loginn(username: string, password: string): Observable<boolean> {
      return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsuario=${username}`).pipe(
        map((users) => {
          const user = users.at(0);
          if (user && user.nombreUsario == username && user.contraseniaUsuario == password){
            /* this.activeUser = { username: user.username, id: user.id! }; */
            this.activeUserSubject.next({ nombre: user.nombreUsario, id: user.id! });
            return true;
          }
          console.log("tira false")
          return true;
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
      return this.http.post<UsuarioActivo>(this.urlBase, usuario).pipe(
        map(({ id, nombre }) => {
          if (id) {
            /* this.activeUser = { id, username }; */
            this.activeUserSubject.next({id, nombre});
            return true;
          }
          return false;
        })
      );
    }

    auth(): Observable<UsuarioActivo | undefined> {
      return this.activeUserSubject.asObservable();}



}
