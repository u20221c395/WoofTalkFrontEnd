import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../service/mascotas.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportemascotaedadmayor10',
  imports: [BaseChartDirective],
  templateUrl: './reportemascotaedadmayor10.component.html',
  styleUrl: './reportemascotaedadmayor10.component.css'
})
export class Reportemascotaedadmayor10Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'pie'
  barChartLegend = true
  barChartData: ChartDataset[] = []
  constructor(private mS: MascotasService) { }
  ngOnInit(): void {
    this.mS.getEdad().subscribe(data => {
      this.barChartLabels = data.map(item => item.nombremascota)
      this.barChartData = [
        {
          data: data.map(item => item.edad),
          label: 'Cantidad de mascotas con edad mayor a 10',
          backgroundColor: new Array(data.length).fill('#fd7e14'),
          borderColor: '#FFFF00',
          borderWidth: 1
        }

      ]
    })
  }
}
