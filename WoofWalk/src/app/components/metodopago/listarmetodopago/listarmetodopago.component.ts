import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Metodopago } from '../../../model/metodopago';
import { MetodopagoService } from '../../../service/metodopago.service';

@Component({
  selector: 'app-listarmetodopago',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarmetodopago.component.html',
  styleUrl: './listarmetodopago.component.css'
})
export class ListarmetodopagoComponent {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];
  dataSource: MatTableDataSource<Metodopago> = new MatTableDataSource()
    constructor(private mpS: MetodopagoService) { }

    ngOnInit(): void {
    this.mpS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

    //Para refrescar la pagina automaticamente cada vez que se registre o actualize
    this.mpS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id: number) {
    this.mpS.deleteC(id).subscribe(data => {
      this.mpS.list().subscribe(data => {
        this.mpS.setList(data)
      })
    })
  }
}
