import { Categoria } from "../enums/categoria"

export interface Tarea {
  id?: string,
  titulo: string,
  descripcion: string,
  creador:string | undefined,
  categoria: Categoria
 // aceptada : boolean 
  }
