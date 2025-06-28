import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable, Subject } from 'rxjs';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<Usuario[]>()


  constructor(private h: HttpClient) { }

  list(): Observable<Usuario[]> {
    return this.h.get<Usuario[]>(this.url + '/listar');
  }

  insert(a: Usuario): Observable<Usuario> {
    return this.h.post<Usuario>(this.url + '/registrar', a);
  }
  getList() {
    return this.listaCambio.asObservable()
  }

  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva)
  }

  listId(id: number){
    return this.h.get<Usuario>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(us: Usuario) {
    return this.h.put(this.url + '/actualizar', us)
  }

  deleteC(id: number) {
    return this.h.delete(`${this.url + '/eliminar'}/${id}`)
  }
}
