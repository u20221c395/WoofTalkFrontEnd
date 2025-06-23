import { Calificacion } from "./calificacion";
import { Usuario } from "./usuario";

export class Mascotas {
  id: number = 0;
  nombre: string = "";
  raza: string = "";
  edad: number = 0;
  tamanio: string = "";
  observaciones: string = "";
  user:Usuario = new Usuario();
  calificacion:Calificacion = new Calificacion();
}