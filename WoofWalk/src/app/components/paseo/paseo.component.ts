import { Component } from '@angular/core';
import { ListarpaseoComponent } from "./listarpaseo/listarpaseo.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-paseo',
    imports: [RouterOutlet, ListarpaseoComponent],
    templateUrl: './paseo.component.html',
    styleUrl: './paseo.component.css'
})
export class PaseoComponent {

 constructor(public route:ActivatedRoute){}
}
