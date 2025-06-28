import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Enfermedad } from '../../../model/enfermedad';
import { EnfermedadService } from '../../../service/enfermedad.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarenfermedad',
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, RouterModule, MatPaginatorModule],
    templateUrl: './listarenfermedad.component.html',
    styleUrl: './listarenfermedad.component.css'
})
export class ListarenfermedadComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource()
  constructor(private eS: EnfermedadService, private roter: Router) { }

  ngOnInit(): void {
    this.eS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    //Para refrescar la pagina automaticamente cada vez que se registre o actualize
    this.eS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.eS.deleteC(id).subscribe(data => {
      this.eS.list().subscribe(data => {
        this.eS.setList(data)
      })
    })
  }

  regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('enfermedades/nuevo');
  }
}
