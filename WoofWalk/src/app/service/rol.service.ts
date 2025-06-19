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
     private url = `${base_url}/metododepagos`
      private listaCambio = new Subject<Rol[]>

  constructor(private http:HttpClient) { }

  list (){
        return this.http.get<[Rol]>(this.url + '/listar')
      }
    
      insert(c: Rol){
        return this.http.post(this.url + '/registrar', c)
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
    
      update(ca: Rol){
        return this.http.put(this.url + '/actualizar', ca)
      }
    
      deleteC(id: number){
        return this.http.delete(`${this.url + '/eliminar'}/${id}`)
      }
}
