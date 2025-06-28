import { Enfermedad } from './enfermedad';
import { Mascotas } from "./mascotas";

export class Mascotaenfermedad {

    idMascotaEnfermedad: number = 0
    mascota: Mascotas = new Mascotas()
    enfermedad: Enfermedad = new Enfermedad()
}
