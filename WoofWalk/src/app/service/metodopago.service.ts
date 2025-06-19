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

   private url = `${base_url}/metododepagos`
    private listaCambio = new Subject<Metodopago[]>
  constructor(private http:HttpClient) { }

   list (){
      return this.http.get<[Metodopago]>(this.url + '/listar')
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
  
    listId(id: number){
      return this.http.get<Metodopago>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(ca: Metodopago){
      return this.http.put(this.url + '/actualizar', ca)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
}
