import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Contrato } from '../model/contrato';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
private url = `${base_url}/contratos`
    private listaCambio = new Subject<Contrato[]>
  
    constructor(private http:HttpClient) { }
  
    list (){
      return this.http.get<[Contrato]>(this.url + '/listar')
    }
  
    insert(c: Contrato){
      return this.http.post(this.url + '/agregar', c)
    }
  
    setList(listaNueva: Contrato[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number){
      return this.http.get<Contrato>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(cn: Contrato){
      return this.http.put(this.url + '/actualizar', cn)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  