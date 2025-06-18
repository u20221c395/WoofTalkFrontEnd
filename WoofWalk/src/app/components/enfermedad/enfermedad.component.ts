import { Component } from '@angular/core';
import { ListarenfermedadComponent } from "./listarenfermedad/listarenfermedad.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-enfermedad',
  standalone: true,
  imports: [ListarenfermedadComponent, RouterOutlet],
  templateUrl: './enfermedad.component.html',
  styleUrl: './enfermedad.component.css'
})
export class EnfermedadComponent {

   constructor (public route: ActivatedRoute){}

}
