import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paseo } from '../model/paseo';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class PaseoService {

  private url = `${base_url}/paseos`
    private listaCambio = new Subject<Paseo[]>
  
    constructor(private http:HttpClient) { }
  
     list (): Promise<Paseo[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Paseo[]>(this.url + '/listar').subscribe({
        next: (data) => {
          this.listaCambio.next(data); // Emite la nueva lista a través del Subject
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error('Error al listar paseos:', err); // Mantener un log para depuración
          reject(err);
        }
      });
    });
  }
  
    insert(p: Paseo){
      return this.http.post(this.url + '/agregar', p)
    }
  
    setList(listaNueva: Paseo[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number): Promise<Paseo>{ // Cambiado el tipo de retorno a Promesa de un solo Enfermedad
    return new Promise((resolve, reject) => {
      this.http.get<Paseo>(`${this.url}/buscarporid/${id}`).subscribe({ // Interpolación de string para la URL
        next: (data) => {
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error(`Error al buscar paseo con ID ${id}:`, err); // Mantener un log para depuración
          reject(err);
        }
      });
    });
  }
  
    update(p: Paseo){
      return this.http.put(this.url + '/modificar', p)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  