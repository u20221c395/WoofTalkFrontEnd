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
  private listaCambio = new Subject<Rol[]>(); 

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<[Rol]>(this.url + '/listar')
  }

  insert(rol: Rol) { 
    return this.http.post(this.url + '/agregar', rol);
  }

  setList(listaNueva: Rol[]) {
    this.listaCambio.next(listaNueva);
  }

  getList(){ 
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Rol>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(rol: Rol) { 
    return this.http.put(this.url + '/actualizar', rol);
  }

  deleteC(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }
}
