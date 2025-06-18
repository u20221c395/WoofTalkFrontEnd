import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Calificacion } from '../model/calificacion';
import { Subject } from 'rxjs';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private url = `${base_url}/calificaciones`
  private listaCambio = new Subject<Calificacion[]>

  constructor(private http:HttpClient) { }

  list (){
    return this.http.get<[Calificacion]>(this.url + '/listar')
  }

  insert(c: Calificacion){
    return this.http.post(this.url + '/registrar', c)
  }

  setList(listaNueva: Calificacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  listId(id: number){
    return this.http.get<Calificacion>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(ca: Calificacion){
    return this.http.put(this.url + '/actualizar', ca)
  }

  deleteC(id: number){
    return this.http.delete(`${this.url + '/eliminar'}/${id}`)
  }
}
