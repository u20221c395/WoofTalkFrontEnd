import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Solicitud } from '../../../model/solicitud';
import { SolicitudService } from '../../../service/solicitud.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listarsolicitud',
    imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, RouterModule, MatPaginatorModule],
    templateUrl: './listarsolicitud.component.html',
    styleUrl: './listarsolicitud.component.css'
})
export class ListarsolicitudComponent  implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6'];

  dataSource:MatTableDataSource<Solicitud>=new MatTableDataSource()

  constructor(private soS:SolicitudService, private roter: Router) { }

  ngOnInit(): void {
      this.soS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

          //Para refrescar la pagina automaticamente cada vez que se registre o actualize
      this.soS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    }

  eliminar(id: number) {
    this.soS.deleteC(id).subscribe(data => {
      this.soS.list().subscribe(data => {
        this.soS.setList(data)
      })
    })
  }
  regresar() {
    this.roter.navigateByUrl('menu');
  }
  nuevo() {
    this.roter.navigateByUrl('solicitud/nuevo');
  }

}
