import { Component } from '@angular/core';
import { EnfermedadComponent } from "./components/enfermedad/enfermedad.component";
import { CalificacionComponent } from "./components/calificacion/calificacion.component";
import { MenuComponent } from './components/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
