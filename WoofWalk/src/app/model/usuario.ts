import { Calificacion } from "./calificacion"
import { Rol } from "./rol"

export class Usuario{
    id?: number | null // Ahora puede ser number, undefined o null
    username:string=""
    password:string=""
    nombre:string=""
    apellido:string=""
    telefono:string=""
    enabled:boolean=false

     rolId:number=0 // Propiedad para el ID del rol
    calificacionId:number=0 
}