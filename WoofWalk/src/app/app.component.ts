import { Component } from '@angular/core';
import { EnfermedadComponent } from "./components/enfermedad/enfermedad.component";
import { CalificacionComponent } from "./components/calificacion/calificacion.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalificacionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
