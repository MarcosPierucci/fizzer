import { Component, OnInit } from '@angular/core';
import { UsuarioActivo } from '../../interfaces/usuario';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  usuarioActivo: UsuarioActivo | undefined; 

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.auth().subscribe({
    next: (usuario: UsuarioActivo | undefined) => {

        if(usuario)
        this.usuarioActivo = usuario; // Almacena la información del usuario
         else
         alert ("No existe")
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
      complete: () => {
        console.log('Suscripción completada');
      }
    });

}

}
