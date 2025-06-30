import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { MascotasService } from '../../../service/mascotas.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-reporterazasmascotas',
  imports: [BaseChartDirective],
  templateUrl: './reporterazasmascotas.component.html',
  styleUrl: './reporterazasmascotas.component.css'
})
export class ReporterazasmascotasComponent implements OnInit{
barChartOptions: ChartOptions = {
    responsive: true
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []
  constructor(private mS: MascotasService) { }
  ngOnInit(): void {
    this.mS.getRaza().subscribe(data => {
      this.barChartLabels = data.map(item => item.raza)
      this.barChartData = [
        {
          data: data.map(item => item.cantidad), // assuming 'cantidad' is the count property
          label: 'Cantidad de mascotas por raza',
          backgroundColor: new Array(data.length).fill('#fd7e14'),
          borderColor: '#FFFF00',
          borderWidth: 1
        }
      ]
    })
  }
}