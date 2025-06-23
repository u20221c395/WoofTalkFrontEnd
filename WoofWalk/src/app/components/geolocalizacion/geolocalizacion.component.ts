import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListargeolocalizacionComponent } from "./listargeolocalizacion/listargeolocalizacion.component";

@Component({
  selector: 'app-geolocalizacion',
  standalone: true,
  imports: [RouterOutlet, ListargeolocalizacionComponent],
  templateUrl: './geolocalizacion.component.html',
  styleUrl: './geolocalizacion.component.css'
})
export class GeolocalizacionComponent {

 constructor(public route:ActivatedRoute){}
}
