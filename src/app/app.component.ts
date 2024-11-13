import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioTareasComponent} from './user/formulario-tareas/formulario-tareas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormularioTareasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tpFinal';
}
