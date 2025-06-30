import { Component } from '@angular/core';
import { EnfermedadService } from '../../../service/enfermedad.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BuscarPorMascota } from '../../../model/BuscarPorMascota';

@Component({
  selector: 'app-reportebuscarmascotacon-enfermedad',
  imports: [FormsModule,CommonModule ],
  templateUrl: './reportebuscarmascotacon-enfermedad.component.html',
  styleUrl: './reportebuscarmascotacon-enfermedad.component.css'
})
export class ReportebuscarmascotaconEnfermedadComponent {
  nombreEnfermedad: string = '';
  mascotas: BuscarPorMascota[] = [];

  constructor(private enfermedadesService: EnfermedadService) {} // <-- Inyecta correctamente

  buscarMascotas() {
    if (!this.nombreEnfermedad.trim()) {
      alert('Ingrese un nombre de enfermedad');
      return;
    }

   this.enfermedadesService.getmascotaporEnfermedad(this.nombreEnfermedad).subscribe({
    next: (data: BuscarPorMascota[]) => {
    this.mascotas = data;
    },
   error: (err) => {
    console.error('Error al buscar mascotas por enfermedad', err);
  }
});
  }

}
