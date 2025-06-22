import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs'; // <-- CORRECCIÓN 2: Importado 'Observable'
import { Rol } from '../model/rol'; // Asegúrate de que la ruta a tu modelo Rol sea correcta

const base_url = environment.base; // Asegúrate de que environment.ts define la base URL de tu backend

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url = `${base_url}/roles`; 
  private listaCambio = new Subject<Rol[]>(); // <-- CORRECCIÓN 1: Agregado '()' para instanciar el Subject

  constructor(private http: HttpClient) { }

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

  insert(rol: Rol) { // <-- CORRECCIÓN 4: Cambiado 'c' a 'rol' para claridad
    return this.http.post(this.url + '/agregar', rol);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(): Observable<Rol[]> { // <-- CORRECCIÓN 3: Tipado de retorno para mayor claridad
    return this.listaCambio.asObservable();
  }

  listId(id: number): Promise<Rol> {
    return new Promise((resolve, reject) => {
      this.http.get<Rol>(`${this.url}/buscarporid/${id}`).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          console.error(`Error al buscar rol con ID ${id}:`, err);
          reject(err);
        }
      });
    });
  }

  update(rol: Rol) { // <-- CORRECCIÓN 4: Cambiado 'ca' a 'rol' para claridad
    return this.http.put(this.url + '/actualizar', rol);
  }

  deleteC(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
