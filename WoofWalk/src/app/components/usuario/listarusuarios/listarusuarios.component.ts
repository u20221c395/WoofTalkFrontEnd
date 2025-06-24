import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,RouterLink],
  templateUrl: './listarusuarios.component.html',
  styleUrl: './listarusuarios.component.css'
})
export class ListarusuariosComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8','c9','c10','c11'];

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource()

  constructor(private uS: UsuarioService) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })


    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })

  }

  eliminar(id: number) {
    this.uS.deleteC(id).subscribe(data => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data)
      })
    })
  }
  

}
