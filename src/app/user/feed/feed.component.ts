import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../../interfaces/publicacion';
import { PublicacionServiceService } from '../../service/publicacion-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(private publicacionService: PublicacionServiceService) {}

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones(): void {
    this.publicacionService.getPublicacion().subscribe((data) => {
      this.publicaciones = data;
    });
  }

}
