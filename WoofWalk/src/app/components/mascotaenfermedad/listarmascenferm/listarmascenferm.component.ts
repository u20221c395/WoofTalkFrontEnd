import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MascotaenfermedadService } from '../../../service/mascotaenfermedad.service';
import { Mascotaenfermedad } from '../../../model/mascotaenfermedad';

@Component({
    selector: 'app-listarmascenferm',
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, MatPaginatorModule],
    templateUrl: './listarmascenferm.component.html',
    styleUrl: './listarmascenferm.component.css'
})
export class ListarmascenfermComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];

  dataSource:MatTableDataSource<Mascotaenfermedad>=new MatTableDataSource()

  constructor(private maenS:MascotaenfermedadService, private roter: Router) { }

  ngOnInit(): void {
      this.maenS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

          //Para refrescar la pagina automaticamente cada vez que se registre o actualize
      this.maenS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }

  eliminar(id: number) {
    this.maenS.deleteC(id).subscribe(data => {
      this.maenS.list().subscribe(data => {
        this.maenS.setList(data)
      })
    })
  }
      regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('mascotaenfermedad/nuevo');
  }

}