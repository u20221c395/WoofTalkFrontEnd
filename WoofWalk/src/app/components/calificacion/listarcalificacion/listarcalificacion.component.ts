import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Calificacion } from '../../../model/calificacion';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
    selector: 'app-listarcalificacion',
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, RouterModule, MatPaginatorModule],
    templateUrl: './listarcalificacion.component.html',
    styleUrl: './listarcalificacion.component.css'
})
export class ListarcalificacionComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Calificacion> = new MatTableDataSource()
  constructor(private cS: CalificacionService, private roter: Router) { }

  ngOnInit(): void {
    this.cS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

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
    this.roter.navigateByUrl('calificaciones/nuevo');
  }
}
