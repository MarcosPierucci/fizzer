import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-barra-verde-usuario',
  standalone: true,
  templateUrl: './barra-verde-usuario.component.html',
  styleUrls: ['./barra-verde-usuario.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class BarraVerdeUsuarioComponent {
  usuarioBuscar: string = '';

  constructor(private router: Router, private busquedaUsuariosService: UsuarioService) {}

  cerrarSesion() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.innerText = "Cerrando sesión...";
      logoutButton.setAttribute('disabled', 'true');
    }
    setTimeout(() => {
      this.router.navigate(['/logisn']);
    }, 1000);
  }

  buscar() {
    if (this.usuarioBuscar.trim()) { //el trim elimina los espacios en blanco
      this.busquedaUsuariosService.getUsuarioByName(this.usuarioBuscar).subscribe(
        {
          next: (usuarios) => {
            console.log("El usuario que se esta buscando es :"+this.usuarioBuscar)
            this.busquedaUsuariosService.resultadosSubject.next(usuarios); // esta linea actualiza los datos de "usuarios"
            this.router.navigate(['/resultados-busqueda']); // se redirige a la página de resultados
          },
          error: () => console.error('Error al buscar usuarios')
        }
      );
    }
  }

}
