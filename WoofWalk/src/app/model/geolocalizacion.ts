import { Clima } from './clima';
export class Geolocalizacion {

    idGeolocalizacion: number = 0
    latitud: number = 0
    longitud: number = 0
    fecha :Date = new Date()
    clima: Clima = new Clima()
}
