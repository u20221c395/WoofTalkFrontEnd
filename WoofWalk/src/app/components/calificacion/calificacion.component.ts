import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcalificacionComponent } from "./listarcalificacion/listarcalificacion.component";


@Component({
  selector: 'app-calificacion',
  standalone: true,
  imports: [RouterOutlet, ListarcalificacionComponent],
  templateUrl: './calificacion.component.html',
  styleUrl: './calificacion.component.css'
})
export class CalificacionComponent {
  
  constructor (public route: ActivatedRoute){}

}
