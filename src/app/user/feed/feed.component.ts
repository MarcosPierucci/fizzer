import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======

>>>>>>> e91bd6c1d22a174c8d3848ce70e1cd0fc678c130


@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, PublicacionComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionServiceService) {}

  ngOnInit(): void {
    this.getPublicaciones();
    console.log("PUBLIS: "+this.publicaciones)
  }

  getPublicaciones(): void {
    this.publicacionService.getPublicacion().subscribe((data) => {
      this.publicaciones = data;
    });
  }

}