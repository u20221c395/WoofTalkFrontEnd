import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contrato } from '../../../model/contrato';
import { ContratoService } from '../../../service/contrato.service';
<<<<<<< HEAD
import {  RouterModule } from '@angular/router';
=======
import { RouterLink, RouterModule } from '@angular/router';
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarcontrato',
<<<<<<< HEAD
    imports: [MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, RouterModule],
=======
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, MatPaginatorModule, RouterModule],
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
    templateUrl: './listarcontrato.component.html',
    styleUrl: './listarcontrato.component.css'
})
export class ListarcontratoComponent implements OnInit{
<<<<<<< HEAD
  displayedColumns: string[] = ['c1', 'c2', 'c3','c4','c5','c6','c7','c8'];
=======
  displayedColumns: string[] = ['c1', 'c2', 'c3','c6','c7'];
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c

  dataSource:MatTableDataSource<Contrato>=new MatTableDataSource()

  constructor(private coS:ContratoService, private roter: Router) { }

  ngOnInit(): void {
      this.coS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
      this.coS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.coS.deleteC(id).subscribe(data => {
      this.coS.list().subscribe(data => {
        this.coS.setList(data)
      })
    })
  }

    regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('contrato/nuevo');
  }

}
