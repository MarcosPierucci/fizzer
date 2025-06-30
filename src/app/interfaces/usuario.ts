
export interface Usuario {
    id?: string;
    nombreUsario: string;
    contraseniaUsuario: string;
    baneado : boolean;
    admin: boolean;
    seguidores: string[]
}

export interface UsuarioActivo {
    id: string;
    nombre: string;
    admin: boolean;
}
