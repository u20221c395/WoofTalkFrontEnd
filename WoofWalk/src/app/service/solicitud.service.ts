import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Solicitud } from '../model/solicitud';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class SolicitudService {

private url = `${base_url}/solicitudes`
    private listaCambio = new Subject<Solicitud[]>
  
    constructor(private http:HttpClient) { }
  
    list (){
      return this.http.get<[Solicitud]>(this.url + '/listar')
    }
  
    insert(s: Solicitud){
      return this.http.post(this.url + '/registrar', s)
    }
  
    setList(listaNueva: Solicitud[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number){
      return this.http.get<Solicitud>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(so: Solicitud){
      return this.http.put(this.url + '/actualizar', so)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  