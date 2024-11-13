import { Component } from '@angular/core';
import {RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-verde-usuario',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './barra-verde-usuario.component.html',
  styleUrl: './barra-verde-usuario.component.css'
})
export class BarraVerdeUsuarioComponent {
 
  constructor(private router : Router){}

  cerrarSesion() {
    const logoutButton = document.getElementById('logoutButton');
    
    if (logoutButton) {
      logoutButton.innerText = "Cerrando sesión..."; // Cambiar texto del botón
      logoutButton.setAttribute('disabled', 'true'); // Desactivar botón
    }

    // Simular espera de 2 segundos antes de redireccionar
    setTimeout(() => {
      this.router.navigate(['/login']); // Redirigir a la ruta de login
    }, 1000); // Espera de 2 segundos
  }


}
