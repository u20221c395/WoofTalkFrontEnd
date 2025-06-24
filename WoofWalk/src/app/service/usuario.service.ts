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
  private url=`${base_url}/usuarios`; 
  private listaCambio=new Subject<Usuario[]>()
  

  constructor(private h:HttpClient) { }

  list(){ 
    return this.h.get<Usuario[]>(this.url + '/listar'); 
  }

  insert(a:Usuario){
    return this.h.post<Usuario>(this.url + '/registrar', a); 
  }
  getList(){
    return this.listaCambio.asObservable()
  }

  setList(listaNueva:Usuario[]){
    this.listaCambio.next(listaNueva)
  }

  listId(id: number){
    return this.h.get<Usuario>(`${this.url + '/buscarporid'}/${id}`)
  }
  
    update(usu: Usuario){
      return this.h.put(this.url + '/actualizar', usu)
    }
  
    deleteC(id: number){
      return this.h.delete(`${this.url + '/eliminar'}/${id}`)
    }
}
