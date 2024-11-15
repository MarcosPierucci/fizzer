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

// `resultadosSubject` es un BehaviorSubject que almacena los resultados de la búsqueda de usuarios. Lo arranco con un arreglo vacio.
public resultadosSubject = new BehaviorSubject<any[]>([]);

//
resultadoObservable = this.resultadosSubject.asObservable();

constructor(private http: HttpClient) { }

/*Che, hay que ver porque pusimos en todos con tarea si estamos en usuario, y ver que no se rompa nada cuando lo cambiemos*/
getUsuarios(): Observable<Usuario[]>{
  return this.http.get<Usuario[]>(this.urlBase);
}

getUsuarioById(id : string | null): Observable<Usuario>{
  return this.http.get<Usuario>(`${this.urlBase}/${id}`);
}

postUsuario(usuario : Usuario): Observable<Usuario>{
  return this.http.post<Usuario>(this.urlBase, usuario);
}

putUsuario(usuario: Usuario, id: string | null): Observable<Usuario>{
  return this.http.put<Usuario>(`${this.urlBase}/${id}`, usuario);
}

deleteUsuario(id:string):Observable<void>{
  return this.http.delete<void>(`${this.urlBase}/${id}`);
}

patchBaneado(id: number, baneado: boolean): Observable<any> {
  return this.http.patch(`${this.urlBase}/${id}`, { baneado });
}

patchBaneadoPublicacion(id: string|any, baneado: boolean): Observable<any> {
  return this.http.patch(`${this.urlBase2}/${id}`, { baneado });
}


getPubliacionbyId(publicacionId: string): Observable<Publicacion> {
  return this.http.get<Publicacion>(`${this.urlBase2}/${publicacionId}`);
}


loginn(username: string, password: string): Observable<boolean> {
  return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsario=${username}`).pipe(
    map((users) => {
    const user = users.at(0);
    if (user && user.nombreUsario == username && user.contraseniaUsuario == password){
     // this.activeUser = { username: user.username, id: user.id! };
    this.activeUserSubject.next({ nombre: user.nombreUsario, id: user.id!,admin: user.admin});
    return true;
    }

    return false;
  }),
  catchError(() => of(false))
  );
}

getUsuarioByName(username: string): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${this.urlBase}?nombreUsario=${username}`);
}

logout(): Observable<boolean> {
/* this.activeUser = undefined; */
this.activeUserSubject.next(undefined);
return of(true);
}

signup(usuario: Usuario): Observable<boolean> {
return this.http.post<UsuarioActivo>(this.urlBase, usuario).pipe(
    map(({ id, nombre, admin}) => {
      if (id) {
        /* this.activeUser = { id, username }; */
        this.activeUserSubject.next({id, nombre,admin });
        return true;
      }
    return false;
    })
  );
}

auth(): Observable<UsuarioActivo | undefined> {
  return this.activeUserSubject.asObservable();}


getUsersCount(): Observable<string> {
  return this.http.get<any[]>(this.urlBase).pipe(
  map(users => (users.length).toString()) // Mapear a la longitud del arreglo de usuarios
);
}


}
