import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { Enfermedad } from '../../../model/enfermedad';
import { EnfermedadService } from '../../../service/enfermedad.service';

@Component({
  selector: 'app-listarenfermedad',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarenfermedad.component.html',
  styleUrl: './listarenfermedad.component.css'
})
export class ListarenfermedadComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource: MatTableDataSource<Enfermedad> = new MatTableDataSource()
  constructor(private eS: EnfermedadService) { }

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
}
