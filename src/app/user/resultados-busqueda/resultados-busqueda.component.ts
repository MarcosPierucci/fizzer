import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule, NgFor],
  standalone: true,
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.css'],
})
export class ResultadosBusquedaComponent implements OnInit {

  // `resultados` almacena los datos de la búsqueda para mostrarlos en la vista
  // aparece vacia inicialmente
  resultados: any[] = [];

  constructor(private busquedaUsuariosService: UsuarioService) {}

  // esto es lo que se ejecuta al inicializar el componente
  ngOnInit(): void {

    //estamos instantaneamente suscritos al observable `resultadosObservable` para obtener los resultados de búsqueda
    this.busquedaUsuariosService.resultadoObservable.subscribe(
      (infoServicio) => {
        this.resultados = infoServicio;
        console.log("Resultados: "+infoServicio)
      }
      ) // actualizamos `resultados` con los datos recibidos
  }
}

