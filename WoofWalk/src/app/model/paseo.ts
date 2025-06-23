import { Mascotas } from "./mascotas";
import { Geolocalizacion } from "./geolocalizacion";
import { Usuario } from "./usuario";

export class Paseo{
    id:number=0
    descripcion: string = ""
    fecha_inicio: Date=new Date()
    fecha_fin: Date=new Date()
    mascotas:Mascotas=new Mascotas()
    geolocalizacion: Geolocalizacion=new Geolocalizacion()
    user: Usuario=new Usuario()

}