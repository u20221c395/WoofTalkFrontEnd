import { Component } from '@angular/core';
import { EnfermedadComponent } from "./components/enfermedad/enfermedad.component";
import { CalificacionComponent } from "./components/calificacion/calificacion.component";
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { ClimaComponent } from "./components/clima/clima.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent,RouterOutlet, ClimaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
