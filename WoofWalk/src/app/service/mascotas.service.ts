import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Mascotas } from '../model/mascotas';
import { map, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MascotasporDuenoDTO } from '../model/MascotasporDuenoDTO';
import { Mascotaconedad10DTO } from '../model/mascotasconedad10DTO';
import { MascotasRazaDTO } from '../model/mascotasRazaDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  private url = `${base_url}/mascotas`;
  private listaCambio = new Subject<Mascotas[]>();

  constructor(private http: HttpClient) { }

  list(): Observable<Mascotas[]> {
    return this.http.get<Mascotas[]>(this.url + '/listar');
  }

  insert(a: Mascotas): Observable<Mascotas> {
    return this.http.post<Mascotas>(this.url + '/registrar', a);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Mascotas[]) {
    this.listaCambio.next(listaNueva);
  }

  listId(id: number) {
    return this.http.get<Mascotas>(`${this.url + '/buscarporid'}/${id}`)
  }

  update(ma: Mascotas) {
    return this.http.put(this.url + '/actualizar', ma)
  }

  deleteC(id: number) {
    return this.http.delete(`${this.url + '/eliminar'}/${id}`)
  }

  getDueno(): Observable<MascotasporDuenoDTO[]> {
    return this.http.get<MascotasporDuenoDTO[]>(this.url + '/mascotasporDueno')
  }

  getEdad(): Observable<Mascotaconedad10DTO[]> {
    return this.http.get<Mascotaconedad10DTO[]>(this.url + '/mascotasconedadmasde10')
  }

  getRaza(): Observable<MascotasRazaDTO[]> {
    return this.http.get<MascotasRazaDTO[]>(this.url + '/razasdemascotas')
  }

  getTamanio(tamanio: string): Observable<string[]>{
    return this.http.get<string[]>(
      this.url + '/mascotasPorTamaño', {params: {tamanio}}
    )
  }
}
