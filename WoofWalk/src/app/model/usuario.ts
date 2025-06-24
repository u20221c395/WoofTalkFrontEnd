import { Calificacion } from "./calificacion"
import { Rol } from "./rol"

export class Usuario{
    id: number=0 
    username:string=""
    password:string=""
    nombre:string=""
    apellido:string=""
    telefono:string=""
    enabled:boolean=false
    rol: Rol=new Rol()
    calificacion: Calificacion=new Calificacion()

}