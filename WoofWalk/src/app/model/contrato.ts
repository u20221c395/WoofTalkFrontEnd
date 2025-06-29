import { Mascotas } from "./mascotas"
import { Metodopago } from "./metodopago"

export class Contrato {

    id_Contrato: number = 0
    fecha_inicio: Date = new Date()
    fecha_fin: Date = new Date()
    monto: number = 0
    mascota:Mascotas = new Mascotas()
    metodopago:Metodopago = new Metodopago()
}
