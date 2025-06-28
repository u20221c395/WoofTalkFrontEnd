import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Enfermedad } from '../model/enfermedad';
import { BuscarPorMascota } from '../model/buscarporMascota';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class EnfermedadService {

  private url = `${base_url}/enfermedades`
  private listaCambio = new Subject<Enfermedad[]>

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<[Enfermedad]>(this.url + '/listar')
  }

  insert(e: Enfermedad) {
    return this.http.post(this.url + '/registrar', e)
  }

  setList(listaNueva: Enfermedad[]) {
    this.listaCambio.next(listaNueva)
  }

  getList() {
    return this.listaCambio.asObservable()
  }

  listId(id: number) {
    return this.http.get<Enfermedad>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(en: Enfermedad) {
    return this.http.put(this.url + '/actualizar', en)
  }

  deleteC(id: number) {
    return this.http.delete(`${this.url + '/eliminar'}/${id}`)
  }

  getmascotaporEnfermedad(nombreEnfermedad:string){
  return this.http.get<BuscarPorMascota[]>(`${this.url}/mascotasPorEnfermedad/${encodeURIComponent(nombreEnfermedad)}`);
  }


  
}
