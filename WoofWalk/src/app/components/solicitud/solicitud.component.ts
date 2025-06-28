import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsolicitudComponent } from "./listarsolicitud/listarsolicitud.component";

@Component({
    selector: 'app-solicitud',
    imports: [RouterOutlet, ListarsolicitudComponent],
    templateUrl: './solicitud.component.html',
    styleUrl: './solicitud.component.css'
})
export class SolicitudComponent {

 constructor(public route:ActivatedRoute){}
}
