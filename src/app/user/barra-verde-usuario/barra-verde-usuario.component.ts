import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioActivo } from '../../interfaces/usuario';

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
      this.router.navigate(['/login']);
    }, 1000);
  }

  buscar() {
    console.log("El usuario que se esta buscando es: "+this.usuarioBuscar)
    if (this.usuarioBuscar.trim()) { //el trim elimina los espacios en blanco
      this.usuarioService.getUsuarios().subscribe(
        {
          next: (usuarios) => {
            //traigo todos los usuarios y los filtro en esta linea porque si uso el servicio getByName, me devuleve unicamente el usuario EXACTO y no resultados similares. 
            //es para una busqueda mas flexible, si quiero buscar a FacuGamer, puedo escribir solo "Facu" y el filtro se encarga de enconrtar relaciones
            console.log("Filtro")
            const resultadosFiltrados = usuarios.filter(usuario => usuario.nombreUsario.toLowerCase().includes(this.usuarioBuscar.toLowerCase()))
            console.log("Resultados filtrados: ")
            resultadosFiltrados.forEach(resultado => console.log(resultado.nombreUsario))

            this.usuarioService.resultadosSubject.next(resultadosFiltrados); // esta linea actualiza los datos de "usuarios"
            this.router.navigate(['/resultados-busqueda']); // se redirige a la página de resultados
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
  

}
