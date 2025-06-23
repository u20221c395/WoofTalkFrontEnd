import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mascotas } from '../model/mascotas';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  private url = `${base_url}/mascotas`;
  private listaCambio = new Subject<Mascotas[]>();

  constructor(private h: HttpClient) {}

  list(): Observable<Mascotas[]> {
    return this.h.get<Mascotas[]>(this.url + '/listar');
  }

  insert(a:Mascotas): Observable<Mascotas> {
    return this.h.post<Mascotas>(this.url + '/registrar', a);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva:Mascotas[]) {
    this.listaCambio.next(listaNueva);
  }
}
