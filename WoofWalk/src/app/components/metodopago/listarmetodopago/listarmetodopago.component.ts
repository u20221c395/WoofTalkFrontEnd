import { Component, OnInit } from '@angular/core'; 
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Metodopago } from '../../../model/metodopago';
import { MetodopagoService } from '../../../service/metodopago.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarmetodopago',
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, CommonModule, RouterModule, MatPaginatorModule],
    templateUrl: './listarmetodopago.component.html',
    styleUrl: './listarmetodopago.component.css'
})
export class ListarmetodopagoComponent implements OnInit{

 displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6'];

  dataSource:MatTableDataSource<Metodopago>=new MatTableDataSource()

  constructor(private metS:MetodopagoService, private roter: Router) { }


  ngOnInit(): void {
      this.metS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

          //Para refrescar la pagina automaticamente cada vez que se registre o actualize
      this.metS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }

  eliminar(id: number) {
    this.metS.deleteC(id).subscribe(data => {
      this.metS.list().subscribe(data => {
        this.metS.setList(data)
      })
    })
  }
      regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('metodosdepagos/nuevo');
  }

}
