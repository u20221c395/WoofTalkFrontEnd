import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmascenfermComponent } from "./listarmascenferm/listarmascenferm.component";

@Component({
    selector: 'app-mascotaenfermedad',
    imports: [RouterOutlet, ListarmascenfermComponent],
    templateUrl: './mascotaenfermedad.component.html',
    styleUrl: './mascotaenfermedad.component.css'
})
export class MascotaenfermedadComponent {

  constructor(public route:ActivatedRoute){}
}
