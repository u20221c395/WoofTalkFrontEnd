import { Calificacion } from "./calificacion";
import { Usuario } from "./usuario";

export class Mascotas {

  idMascota: number = 0;
  nombremascota: string = "";
  raza: string = "";
  edad: number = 0;
  tamanio: string = "";
  observaciones: string = "";
  user :Usuario = new Usuario();
  calificacion :Calificacion = new Calificacion();
  
}