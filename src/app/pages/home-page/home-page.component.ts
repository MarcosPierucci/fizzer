import { Component } from '@angular/core';
import { BarraVerdeUsuarioComponent } from "../../user/barra-verde-usuario/barra-verde-usuario.component";
import { FeedComponent } from "../../user/feed/feed.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BarraVerdeUsuarioComponent,FeedComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
