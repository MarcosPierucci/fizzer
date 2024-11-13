import { Publicacion } from "./publicacion";

export interface Usuario {
    id: string,
    idUsuario?: string,
    nombreUsario: string,
    contraseniaUsuario: string,
    baneado : boolean,
    publicaciones: Publicacion[];
}

export interface UsuarioActivo {
    id: string,
    nombre: string
}
