import { Component } from '@angular/core';
import { BarraVerdeUsuarioComponent } from "../../user/barra-verde-usuario/barra-verde-usuario.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BarraVerdeUsuarioComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
