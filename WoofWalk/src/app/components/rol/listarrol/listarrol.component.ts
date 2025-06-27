import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../model/rol';
import { RolService } from '../../../service/rol.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarrol',
    imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule, RouterModule, MatPaginatorModule],
    templateUrl: './listarrol.component.html',
    styleUrl: './listarrol.component.css'
})
export class ListarrolComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource()
  constructor(private rS: RolService, private roter: Router) { }
  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    //Para refrescar la pagina automaticamente cada vez que se registre o actualize
    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.rS.deleteC(id).subscribe(data => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data)
      })
    })
  }

  regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('roles/nuevo');
  }
}
