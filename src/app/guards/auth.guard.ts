import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UsuarioService } from '../service/usuario.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.usuarioService.auth().pipe(
    map(usuario => {
      if (!usuario) {
        this.router.navigate(['/login']);
        return false;
      }

      // Chequea si la ruta requiere admin (con data del route)
      const requiereAdmin = route.data['soloAdmin'] === true;

      if (requiereAdmin && !usuario.admin) {
        this.router.navigate(['/home']); // o cualquier otra ruta a la que quieras redirigir
        return false;
      }

      return true;
    })
  );
}
}
