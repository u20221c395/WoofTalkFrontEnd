import { Component } from '@angular/core';
import { MascotasService } from '../../../service/mascotas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportetamaniomascota',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportetamaniomascota.component.html',
  styleUrl: './reportetamaniomascota.component.css'
})
export class ReportetamaniomascotaComponent {

  tamanio = ""
  nombres: string[] = [];

  constructor(private mS: MascotasService){}

  buscar(){
    if(!this.tamanio.trim()){
      return;
    }
    this.mS.getTamanio(this.tamanio.trim()).subscribe(data => {
      this.nombres = data
    })
  }
}
