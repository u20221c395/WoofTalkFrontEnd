import { Component } from '@angular/core';
import { LandingpageComponent } from "./components/landingpage/landingpage.component";
import { MenuComponent } from "./components/menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ LandingpageComponent, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WoofWalk';
}
