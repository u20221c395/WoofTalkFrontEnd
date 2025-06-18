import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Clima } from '../model/clima';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url = `${base_url}/climas`
    private listaCambio = new Subject<Clima[]>
  
    constructor(private http:HttpClient) { }
  
    list (){
      return this.http.get<[Clima]>(this.url + '/listar')
    }
  
    insert(c: Clima){
      return this.http.post(this.url + '/registrar', c)
    }
  
    setList(listaNueva: Clima[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number){
      return this.http.get<Clima>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(cl: Clima){
      return this.http.put(this.url + '/actualizar', cl)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  