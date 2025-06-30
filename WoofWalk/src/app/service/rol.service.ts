import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Rol } from '../model/rol';
import { CantidadRolUsers } from '../model/CantidadRolUsers';

const base_url = environment.base; 

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = `${base_url}/roles`
  private listaCambio = new Subject<Rol[]>

  constructor(private http:HttpClient) { }

  list (){
    return this.http.get<[Rol]>(this.url + '/listar')
  }

  insert(r: Rol){
    return this.http.post(this.url + '/registrar', r)
  }

  setList(listaNueva: Rol[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number){
    return this.http.get<Rol>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(ro: Rol){
    return this.http.put(this.url + '/actualizar', ro)
  }

  deleteC(id: number){
    return this.http.delete(`${this.url + '/eliminar'}/${id}`)
  }

   getRolUsers(): Observable<CantidadRolUsers[]> {
    return this.http.get<CantidadRolUsers[]>('http://localhost:8082/roles/listarCantidadDeUsuariosRegistrados')
  }
}

