import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Mascotaenfermedad } from '../model/mascotaenfermedad';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MascotaenfermedadService {
  private url = `${base_url}/MascotaEnfermedad`;
  private listaCambio = new Subject<Mascotaenfermedad[]>()


  constructor(private h: HttpClient) { }

  list(): Observable<Mascotaenfermedad[]> {
    return this.h.get<Mascotaenfermedad[]>(this.url + '/listar');
  }

  insert(me: Mascotaenfermedad): Observable<Mascotaenfermedad> {
    return this.h.post<Mascotaenfermedad>(this.url + '/agregar', me);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  setList(listaNueva: Mascotaenfermedad[]) {
    this.listaCambio.next(listaNueva)
  }

  listId(id: number){
    return this.h.get<Mascotaenfermedad>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(mes: Mascotaenfermedad) {
    return this.h.put(this.url + '/actualizar', mes)
  }

  deleteC(id: number) {
    return this.h.delete(`${this.url + '/eliminar'}/${id}`)
  }
}
