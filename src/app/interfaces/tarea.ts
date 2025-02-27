import { Categoria } from "../enums/categoria"

export interface Tarea {
  id?: string,
  titulo: string,
  descripcion: string,
  creador:string | undefined,
  categorias: Categoria[]
  aceptada : boolean //Si fue aceptada se pasa a true y puede aparecer como tarea global, si aun no fue aceptada va a ser false y esta pendiente de ser aceptada o rechazada. Si se rechazo, se borra del json.
}
