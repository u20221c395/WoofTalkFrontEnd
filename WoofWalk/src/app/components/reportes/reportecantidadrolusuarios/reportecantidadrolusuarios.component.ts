import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { RolService } from '../../../service/rol.service';
import { BaseChartDirective } from 'ng2-charts'; // IMPORTANTE

@Component({
  selector: 'app-reportecantidadrolusuarios',
  standalone: true,
  imports: [BaseChartDirective], // <== Esto es CLAVE
  templateUrl: './reportecantidadrolusuarios.component.html',
  styleUrl: './reportecantidadrolusuarios.component.css'
})
export class ReportecantidadrolusuariosComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(private rS: RolService) {}

  ngOnInit(): void {
    this.rS.getRolUsers().subscribe(data => {

    const cantidad = data[0]?.cantidad || 0;

    this.barChartData = {
      labels: ['#Usuarios'],
      datasets: [
        {
          data: [cantidad],
          label: 'Cantidad de usuarios registrados',
          backgroundColor: ['#fd7e14'],
          borderColor: '#FFFF00',
          borderWidth: 1
        }
      ]
    };
  });
  }
}
