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
  
    list (){
      return this.http.get<[Paseo]>(this.url + '/listar')
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
  
    listId(id: number){
      return this.http.get<Paseo>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(pa: Paseo){
      return this.http.put(this.url + '/actualizar', pa)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }

  }
  