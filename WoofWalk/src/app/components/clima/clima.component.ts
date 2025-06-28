import { Component } from '@angular/core';
import { ListarclimaComponent } from "./listarclima/listarclima.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-clima',
    imports: [ListarclimaComponent, RouterOutlet],
    templateUrl: './clima.component.html',
    styleUrl: './clima.component.css'
})
export class ClimaComponent {

   constructor (public route: ActivatedRoute){}

}
