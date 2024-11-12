import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {

private fb = inject (FormBuilder)
private router = inject (Router)
private usuarioServicio = inject (UsuarioService)

usuarios : Usuario [] = []

formularioInicioSesion = this.fb.nonNullable.group(
{
  nombreUsuario: ["",[Validators.required, Validators.minLength(3)]],
  contraseniaUsuario: ["",[Validators.required, Validators.minLength(5)]]
})






inicioSesion()
{
  const {nombreUsuario,contraseniaUsuario} = this.formularioInicioSesion.getRawValue()

  this.usuarioServicio.login(nombreUsuario!,contraseniaUsuario!).subscribe(
    {
      next: (loggedIn) =>
      {
        if(loggedIn)
          this.router.navigate(['/'])
      },
      error: (e: Error) =>
      {
        alert ('ERROR INICIO SESION')
      }
    }
  )


}




}
