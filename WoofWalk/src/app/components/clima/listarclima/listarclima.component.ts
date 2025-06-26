import { ClimaService } from './../../../service/clima.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Clima } from '../../../model/clima';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarclima',
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, RouterModule, MatPaginatorModule],
    templateUrl: './listarclima.component.html',
    styleUrl: './listarclima.component.css'
})
export class ListarclimaComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Clima> = new MatTableDataSource()
  constructor(private cS: ClimaService, private roter: Router) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    //Para refrescar la pagina automaticamente cada vez que se registre o actualize
    this.cS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.cS.deleteC(id).subscribe(data => {
      this.cS.list().subscribe(data => {
        this.cS.setList(data)
      })
    })
  }
  regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('climas/nuevo');
  }
}
