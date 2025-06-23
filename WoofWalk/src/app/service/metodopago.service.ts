import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Metodopago } from '../model/metodopago';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {

  private url = `${base_url}/metodosdepago`; // Asegúrate que esta URL coincida con tu API (plural o singular?)
  private listaCambio = new Subject<Metodopago[]>(); // Subject para emitir listas de Metodopago

  constructor(private http: HttpClient) { }

  // CORRECCIÓN 1: Cambiado el tipo de retorno a `Metodopago[]`
  // CORRECCIÓN 2: Envuelta la llamada HTTP en una Promesa para usar .then() en el componente
  list(): Promise<Metodopago[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Metodopago[]>(this.url + '/listar').subscribe({
        next: (data) => {
          this.listaCambio.next(data); // Emite la nueva lista a través del Subject
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error('Error al listar métodos de pago:', err);
          reject(err);
        }
      });
    });
  }
  
    insert(c: Metodopago){
      return this.http.post(this.url + '/registrar', c)
    }
  
    setList(listaNueva: Metodopago[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
 listId(id: number): Promise<Metodopago> { // Cambiado el tipo de retorno a Promesa de un solo Metodopago
    return new Promise((resolve, reject) => {
      this.http.get<Metodopago>(`${this.url}/buscarporid/${id}`).subscribe({ // Interpolación de string para la URL
        next: (data) => {
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error(`Error al buscar método de pago con ID ${id}:`, err);
          reject(err);
        }
      });
    });
  }
    update(ca: Metodopago){
      return this.http.put(this.url + '/actualizar', ca)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
}
