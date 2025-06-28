import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mascotas } from '../../../model/mascotas';
import { MascotasService } from '../../../service/mascotas.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarmascota',
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, MatPaginatorModule],
    templateUrl: './listarmascota.component.html',
    styleUrl: './listarmascota.component.css'
})
export class ListarmascotaComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
  dataSource: MatTableDataSource<Mascotas> = new MatTableDataSource();

  constructor(private mS: MascotasService, private roter: Router) { }

  ngOnInit(): void {
    this.mS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });


    this.mS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.mS.deleteC(id).subscribe(data => {
      this.mS.list().subscribe(data => {
        this.mS.setList(data);
      });
    });
  }
      regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('mascota/nuevo');
  }
}
