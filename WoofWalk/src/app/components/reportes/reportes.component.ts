import { Component } from '@angular/core';
import { ReportemascotaporduenoComponent } from "./reportemascotapordueno/reportemascotapordueno.component";
import { RouterOutlet ,ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-reportes',
    imports: [ReportemascotaporduenoComponent, RouterOutlet],
    templateUrl: './reportes.component.html',
    styleUrl: './reportes.component.css'
})
export class ReportesComponent {
 constructor (public route: ActivatedRoute){}
}
