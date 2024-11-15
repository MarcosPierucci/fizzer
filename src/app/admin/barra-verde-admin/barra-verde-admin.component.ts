import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-barra-verde-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './barra-verde-admin.component.html',
  styleUrl: './barra-verde-admin.component.css'
})
export class BarraVerdeAdminComponent {


  constructor(private router: Router, private busquedaUsuariosService: UsuarioService) {}

  cerrarSesion() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.innerText = "Cerrando sesión...";
      logoutButton.setAttribute('disabled', 'true');
    }
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

}
