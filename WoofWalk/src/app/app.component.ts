import { Component } from '@angular/core';
import { LandingpageComponent } from "./components/landingpage/landingpage.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
