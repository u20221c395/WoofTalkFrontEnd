import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarusuariosComponent } from './listarusuarios/listarusuarios.component';

@Component({
    selector: 'app-usuario',
    imports: [RouterOutlet, ListarusuariosComponent],
    templateUrl: './usuario.component.html',
    styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  constructor(public route:ActivatedRoute){}
}
