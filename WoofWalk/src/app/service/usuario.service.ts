import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';


const base_url = environment.base; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuarios`; 
  // Opcional: Si planeas tener un Subject para refrescar la lista como en RolService
  // private listaCambio = new Subject<Usuario[]>(); 

  constructor(private h:HttpClient) { }

  list(): Observable<Usuario[]>{ // Cambiado a Observable para consistencia con Angular HttpClient
    // *** CORRECCIÓN CLAVE: Usar 'this.url' para incluir '/usuarios' ***
    return this.h.get<Usuario[]>(this.url + '/listar'); 
  }
}
