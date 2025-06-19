import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Rol } from '../model/rol';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class RolService {
     private url = `${base_url}/roles`
      private listaCambio = new Subject<Rol[]>

  constructor(private http:HttpClient) { }

  list(): Promise<Rol[]> {
      return new Promise((resolve, reject) => {
        this.http.get<Rol[]>(this.url + '/listar').subscribe({
          next: (data) => {
            this.listaCambio.next(data); // Emite la nueva lista a través del Subject
            resolve(data); // Resuelve la Promesa con los datos
          },
          error: (err) => { // Captura el error y rechaza la Promesa
            console.error('Error al listar roles:', err);
            reject(err);
          }
        });
      });
      }
    
      insert(rol: Rol) { // Cambiado 'c' a 'rol' para claridad
    // CORRECCIÓN CLAVE: Cambiado '/registrar' a '/agregar' para coincidir con el backend
    return this.http.post(this.url + '/agregar', rol);
  }
      setList(listaNueva: Rol[]){
        this.listaCambio.next(listaNueva)
      }
    
      getList(){
        return this.listaCambio.asObservable()
      }
    
     listId(id: number): Promise<Rol> { 
         return new Promise((resolve, reject) => {
              this.http.get<Rol>(`${this.url}/buscarporid/${id}`).subscribe({ // Interpolación de string para la URL
                next: (data) => {
                  resolve(data); // Resuelve la Promesa con los datos
                },
                error: (err) => { // Captura el error y rechaza la Promesa
                  console.error(`Error al buscar roles con ID ${id}:`, err);
                  reject(err);
                }
              });
            });
      }
    
      update(ca: Rol){
        return this.http.put(this.url + '/actualizar', ca)
      }
    
      deleteC(id: number){
        return this.http.delete(`${this.url + '/eliminar'}/${id}`)
      }
}
