import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Enfermedad } from '../model/enfermedad';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  private url = `${base_url}/enfermedades`
    private listaCambio = new Subject<Enfermedad[]>
  
    constructor(private http:HttpClient) { }
  
     list (): Promise<Enfermedad[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Enfermedad[]>(this.url + '/listar').subscribe({
        next: (data) => {
          this.listaCambio.next(data); // Emite la nueva lista a través del Subject
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error('Error al listar enfermedades:', err); // Mantener un log para depuración
          reject(err);
        }
      });
    });
  }
  
    insert(e: Enfermedad){
      return this.http.post(this.url + '/agregar', e)
    }
  
    setList(listaNueva: Enfermedad[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number): Promise<Enfermedad>{ // Cambiado el tipo de retorno a Promesa de un solo Enfermedad
    return new Promise((resolve, reject) => {
      this.http.get<Enfermedad>(`${this.url}/buscarporid/${id}`).subscribe({ // Interpolación de string para la URL
        next: (data) => {
          resolve(data); // Resuelve la Promesa con los datos
        },
        error: (err) => { // Captura el error y rechaza la Promesa
          console.error(`Error al buscar enfermedad con ID ${id}:`, err); // Mantener un log para depuración
          reject(err);
        }
      });
    });
  }
  
    update(en: Enfermedad){
      return this.http.put(this.url + '/modificar', en)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  