import { Metodopago } from "./metodopago"
import { Usuario } from "./usuario"

export class Solicitud {

    idSolicitud: number = 0
    fecha: Date = new Date()
    user: Usuario = new Usuario()
    metodoPago: Metodopago = new Metodopago()

}
