import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-verde-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './barra-verde-admin.component.html',
  styleUrl: './barra-verde-admin.component.css'
})
export class BarraVerdeAdminComponent {

  logoFizzer: string = 'logo-fizzer.png'
}
