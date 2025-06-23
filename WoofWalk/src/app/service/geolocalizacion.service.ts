import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Geolocalizacion } from '../model/geolocalizacion';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})

export class GeolocalizacionService {

private url = `${base_url}/geolocalizacion`
    private listaCambio = new Subject<Geolocalizacion[]>
  
    constructor(private http:HttpClient) { }
  
    list (){
      return this.http.get<[Geolocalizacion]>(this.url + '/listar')
    }
  
    insert(g: Geolocalizacion){
      return this.http.post(this.url + '/registrar', g)
    }
  
    setList(listaNueva: Geolocalizacion[]){
      this.listaCambio.next(listaNueva)
    }
  
    getList(){
      return this.listaCambio.asObservable()
    }
  
    listId(id: number){
      return this.http.get<Geolocalizacion>(`${this.url + '/buscarporid'}/${id}`)
    }
  
    update(gn: Geolocalizacion){
      return this.http.put(this.url + '/actualizar', gn)
    }
  
    deleteC(id: number){
      return this.http.delete(`${this.url + '/eliminar'}/${id}`)
    }
  }
  