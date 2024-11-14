export interface Publicacion {
  id: string;
  idUsuario: string;
  link: string;
  urlFoto: string,
  descripcion: string;
  baneado: boolean;
  nombreUsuario: string;
  likes: number;
  puntosFizzer: number;
  comentarios: Comentario[]; 
}

export interface Comentario {
  id: string;
  idUsuario: string;
  nombreUsuario: string;
  texto: string;
}