import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../model/rol';
import { RolService } from '../../../service/rol.service';

@Component({
  selector: 'app-listarrol',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarrol.component.html',
  styleUrl: './listarrol.component.css'
})
export class ListarrolComponent {
 displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource()
  constructor(private rS: RolService) { }
 ngOnInit(): void {
    // Para la carga inicial de datos
    this.rS.list().then((data: Rol[]) => { // Tipado explícito de 'data'
      this.dataSource.data = data; // <-- CORRECCIÓN 2: Actualizar la propiedad .data
    }).catch(error => {
      console.error('Error al cargar la lista de roles:', error);
      // Opcional: mostrar un mensaje de error al usuario
    });

    // Para refrescar la página automáticamente cada vez que se registre o actualice
    // El servicio rS.setList() emitirá a través de este Subject/Observable
    this.rS.getList().subscribe((data: Rol[]) => { // Tipado explícito de 'data'
      this.dataSource.data = data; // <-- CORRECCIÓN 2: Actualizar la propiedad .data
    });
  }


 eliminar(id: number): void { // Tipado explícito para el retorno
    this.rS.deleteC(id).subscribe({ // Usar el objeto de suscriptor para next/error
      next: () => {
        console.log(`Rol con ID ${id} eliminado.`);
        // Después de eliminar, refresca la lista y actualiza el Subject del servicio
        this.rS.list().then((data: Rol[]) => { // Tipado explícito de 'data'
          this.rS.setList(data); // Actualiza el Subject en el servicio
          // La línea this.dataSource.data = data; NO ES NECESARIA aquí porque getList() ya se encargará
          // this.dataSource.data = data;
        }).catch(error => {
          console.error('Error al refrescar la lista después de eliminar:', error);
          // Opcional: mostrar un mensaje de error al usuario
        });
      },
      error: (err) => { // Manejo de errores para la operación de eliminación
        console.error('Error al eliminar el rol:', err);
        alert('Error al eliminar el rol. Por favor, intente de nuevo.');
      }
    });
  }
}
