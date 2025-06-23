import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mascotas } from '../../../model/mascotas';
import { MascotasService } from '../../../service/mascotas.service';

@Component({
  selector: 'app-listarmascota',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './listarmascota.component.html',
  styleUrl: './listarmascota.component.css',
})
export class ListarmascotaComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  dataSource: MatTableDataSource<Mascotas> = new MatTableDataSource();

  constructor(private mS: MascotasService) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      data.forEach((m) => {
        if (!m.calificacion) {
          m.calificacion = { id: 0, calificacion: 'Sin calificación' };
        }
      });
      this.dataSource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
