import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

fb = inject(FormBuilder)
usuarioServicio = inject (UsuarioService)

formularioRegister = this.fb.nonNullable.group({
  nombreUsario: ["",],
  contraseniaUsuario: [""],
  baneado: false,
  admin: false,
})

constructor (private router: Router){}

onSubmit() {
  if (this.formularioRegister.invalid) return;
  // Obtener la longitud del arreglo de usuarios para asignar el ID en formato string
  this.usuarioServicio.getUsersCount().subscribe({
    next: (count) => {
        // Crear el nuevo usuario con el ID basado en la longitud como string
        const user = this.formularioRegister.getRawValue() as unknown as Usuario;
        user.id = count; // Asignar el ID como string

        // Registrar al usuario
        this.usuarioServicio.signup(user).subscribe({
          next: () => {
            alert('Usuario agregado');
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error(error);
            console.log('Redirecting to Home');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1500);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener la cantidad de usuarios:', error);
        alert('Hubo un problema al registrar el usuario');
      }
    });
}

onRevealPassword(pwInput: HTMLInputElement) {
  if (pwInput.type == 'password') {
      pwInput.type = 'text';
  } else {
      pwInput.type = 'password';
  }
}


}
