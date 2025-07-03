import { Component } from '@angular/core';
import { GeminiService } from '../../service/gemini.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recomendaciones',
  imports: [FormsModule,  CommonModule],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {
  pregunta: string = '';
  respuesta: string = '';

  constructor(private geminiService: GeminiService) { }

  consultar() {
    if (!this.pregunta.trim()) return;

    this.geminiService.preguntar(this.pregunta).subscribe({
      next: (res: any) => {
        const text = res?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se obtuvo respuesta.';
        this.respuesta = text;
      },
      error: err => {
        this.respuesta = 'Error al consultar la IA: ' + err.message;
      }
    });
  }
}