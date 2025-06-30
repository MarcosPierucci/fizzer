import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario, UsuarioActivo } from '../../interfaces/usuario';

@Component({
  selector: 'app-barra-verde-usuario',
  standalone: true,
  templateUrl: './barra-verde-usuario.component.html',
  styleUrls: ['./barra-verde-usuario.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class BarraVerdeUsuarioComponent implements OnInit{
  usuarioBuscar: string = '';
  usuarioActivo?: UsuarioActivo;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // Nos suscribimos para obtener el usuario activo
    this.usuarioService.auth().subscribe(usuario => {
      if (usuario) {
        this.usuarioActivo = usuario;
        console.log("USUARIO ACTIVO - ID: "+this.usuarioActivo.id)
      } else {
        console.warn('No hay usuario activo.');
      }
    });
  }

  cerrarSesion() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.innerText = "Cerrando sesión...";
      logoutButton.setAttribute('disabled', 'true');
    }
    setTimeout(() => {
      this.usuarioService.logout().subscribe(() => {
    this.router.navigate(['/login']);
  });
    }, 1000);
  }

  buscar() {
    console.log("El usuario que se esta buscando es: "+this.usuarioBuscar)
    if (this.usuarioBuscar.trim()) {
      this.usuarioService.getUsuarios().subscribe(
        {
          next: (usuarios) => {
            const resultadosFiltrados = usuarios.filter(usuario => usuario.nombreUsario.toLowerCase().includes(this.usuarioBuscar.toLowerCase()))
            console.log("Resultados filtrados: ")
            resultadosFiltrados.forEach(resultado => console.log(resultado.nombreUsario))

            this.usuarioService.resultadosSubject.next(resultadosFiltrados);
            this.router.navigate(['/resultados-busqueda']);
          },
          error: () => console.error('Error al buscar usuarios')
        }
      );
    }
  }

  miPerfil(): void {
    if (this.usuarioActivo?.id) {
      this.router.navigate(['/perfil', this.usuarioActivo.id]);
    } else {
      console.error('No hay usuario activo.');
    }
  }

  // Nueva función para activar interactividad con el logo
  activarInteractividadLogo() {
    console.log('Logo clickeado!');
    // Aquí puedes agregar una animación o algo divertido cuando el usuario haga clic en el logo
  }
}
