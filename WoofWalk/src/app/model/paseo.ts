<<<<<<< HEAD
import { Geolocalizacion } from "./geolocalizacion"
import { Mascotas } from "./mascotas"
import { Usuario } from "./usuario"

=======

import { Geolocalizacion } from "./geolocalizacion"
import { Mascotas } from "./mascotas"
import { Usuario } from "./usuario"

>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
export class Paseo {
    idPaseo: number = 0
    descripcion: string = ""
    fecha_inicio: Date = new Date()
    fecha_fin: Date = new Date()
    mascotas: Mascotas = new Mascotas()
    geolocalizacion: Geolocalizacion = new Geolocalizacion()
    user: Usuario = new Usuario()
}