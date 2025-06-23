import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarmascotaComponent } from './listarmascota/listarmascota.component';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [RouterOutlet, ListarmascotaComponent],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
  constructor(public route: ActivatedRoute) { }
}
