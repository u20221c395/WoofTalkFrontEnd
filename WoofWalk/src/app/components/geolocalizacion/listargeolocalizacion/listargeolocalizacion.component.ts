import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Geolocalizacion } from '../../../model/geolocalizacion';
import { GeolocalizacionService } from '../../../service/geolocalizacion.service';

@Component({
  selector: 'app-listargeolocalizacion',
  standalone: true,
  imports: [MatTableModule, MatButtonModule,MatIconModule],
  templateUrl: './listargeolocalizacion.component.html',
  styleUrl: './listargeolocalizacion.component.css'
})
export class ListargeolocalizacionComponent  implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];

  dataSource:MatTableDataSource<Geolocalizacion>=new MatTableDataSource()

  constructor(private geoS:GeolocalizacionService){}

  ngOnInit(): void {
      this.geoS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
      this.geoS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }
}
