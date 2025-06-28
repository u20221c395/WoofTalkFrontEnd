import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Paseo } from '../../../model/paseo';
import { PaseoService } from '../../../service/paseo.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarpaseo',
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, MatPaginatorModule],
    templateUrl: './listarpaseo.component.html',
    styleUrl: './listarpaseo.component.css'
})
export class ListarpaseoComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7', 'c8', 'c9'];

  dataSource:MatTableDataSource<Paseo>=new MatTableDataSource()

  constructor(private paS:PaseoService, private roter: Router) { }

  ngOnInit(): void {
      this.paS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

          //Para refrescar la pagina automaticamente cada vez que se registre o actualize
      this.paS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }

  eliminar(id: number) {
    this.paS.deleteC(id).subscribe(data => {
      this.paS.list().subscribe(data => {
        this.paS.setList(data)
      })
    })
  }
      regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('paseo/nuevo');
  }

}