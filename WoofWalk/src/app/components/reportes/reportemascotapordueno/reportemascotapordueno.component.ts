import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../../service/mascotas.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-reportemascotapordueno',
    imports: [BaseChartDirective],
    templateUrl: './reportemascotapordueno.component.html',
    styleUrl: './reportemascotapordueno.component.css'
})
export class ReportemascotaporduenoComponent implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }
  barChartLabels:string[]=[]
  barChartType:ChartType='pie'
  barChartLegend=true
  barChartData:ChartDataset[]=[]
  constructor(private mS:MascotasService){}
 ngOnInit(): void {
      this.mS.getDueno().subscribe(data=>{
        this.barChartLabels=data.map(item=>item.dueno)
        this.barChartData=[
          {
            data:data.map(item=>item.mascota),
            label:'Cantidad de mascotas por Dueño',
            backgroundColor:[
               '#4682B4',
              '#4169E1',
              '#ADD8E6',
              '#5F9EA0',
              '#6A5ACD',
              '#40E0D0',             
              '#87CEEB'
            ],
            borderColor:'#00008B',
            borderWidth:1
          }
          
        ]
      })
  }
}
