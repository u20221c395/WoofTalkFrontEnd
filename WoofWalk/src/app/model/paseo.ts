import { Geolocalizacion } from "./geolocalizacion"
import { Mascotas } from "./mascotas"
import { Usuario } from "./usuario"

export class Paseo {
    idPaseo: number = 0
    descripcion: string = ""
    fecha_inicio: Date = new Date()
    fecha_fin: Date = new Date()
    mascotas: Mascotas = new Mascotas()
    geolocalizacion: Geolocalizacion = new Geolocalizacion()
    user: Usuario = new Usuario()
}