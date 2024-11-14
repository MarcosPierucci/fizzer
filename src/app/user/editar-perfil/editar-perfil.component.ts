import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent 
{
  editarPerfilForm = new FormGroup({
    nombreUsuario: new FormControl('', Validators.required),
    contraseniaActual: new FormControl('', Validators.required),
    constraseniaNueva: new FormControl('', Validators.required),
  });
  
  usuarioId: string | null = null;
  usuarioActivo$: Observable<Usuario | undefined> = of(undefined);
  
  servicioUsuario = inject(UsuarioService);

}
