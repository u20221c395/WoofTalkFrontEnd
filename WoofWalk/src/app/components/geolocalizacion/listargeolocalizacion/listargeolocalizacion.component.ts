import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Geolocalizacion } from '../../../model/geolocalizacion';
import { GeolocalizacionService } from '../../../service/geolocalizacion.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listargeolocalizacion',
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, MatPaginatorModule],
    templateUrl: './listargeolocalizacion.component.html',
    styleUrl: './listargeolocalizacion.component.css'
})
export class ListargeolocalizacionComponent  implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7'];

  dataSource:MatTableDataSource<Geolocalizacion>=new MatTableDataSource()

  constructor(private geoS:GeolocalizacionService, private roter: Router) { }

  ngOnInit(): void {
      this.geoS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

          //Para refrescar la pagina automaticamente cada vez que se registre o actualize
      this.geoS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }

  eliminar(id: number) {
    this.geoS.deleteC(id).subscribe(data => {
      this.geoS.list().subscribe(data => {
        this.geoS.setList(data)
      })
    })
  }

    regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('geolocalizacion/nuevo');
  }
}
