import { Component } from '@angular/core';
import { ClimaComponent } from "./components/clima/clima.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ClimaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
