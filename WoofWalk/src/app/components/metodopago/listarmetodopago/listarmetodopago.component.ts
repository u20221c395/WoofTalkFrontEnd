import { Component, OnInit } from '@angular/core'; // Import OnInit as it's used
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Metodopago } from '../../../model/metodopago';
import { MetodopagoService } from '../../../service/metodopago.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarmetodopago',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,CommonModule],
  templateUrl: './listarmetodopago.component.html',
  styleUrl: './listarmetodopago.component.css'
})
export class ListarmetodopagoComponent implements OnInit{

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6'];
  dataSource: MatTableDataSource<Metodopago> = new MatTableDataSource()
    constructor(private mpS: MetodopagoService) { }

    ngOnInit(): void {
    // CORRECCIÓN 1: mpS.list() devuelve una Promesa, por lo tanto, usa .then()
    // CORRECCIÓN 2: Tipado explícito para 'data'
    // CORRECCIÓN 3: Actualiza la propiedad .data del dataSource existente
    this.mpS.list().then((data: Metodopago[]) => {
      this.dataSource.data = data;
    }).catch(error => {
      console.error('Error al cargar la lista de métodos de pago:', error);
      // Puedes añadir aquí un mensaje al usuario, por ejemplo, con un snackbar
    });

    // CORRECCIÓN 1: mpS.getList() devuelve un Observable, así que .subscribe() es correcto
    // CORRECCIÓN 2: Tipado explícito para 'data'
    // CORRECCIÓN 3: Actualiza la propiedad .data del dataSource existente
    // Para refrescar la pagina automaticamente cada vez que se registre o actualize
    this.mpS.getList().subscribe((data: Metodopago[]) => {
      this.dataSource.data = data;
    });
  }

 eliminar(id: number): void { // Tipado explícito para el retorno
    this.mpS.deleteC(id).subscribe({
      next: () => {
        console.log(`Método de pago con ID ${id} eliminado.`);
        // Después de eliminar, refresca la lista llamando a list()
        // CORRECCIÓN: mpS.list() devuelve una Promesa, usa .then()
        this.mpS.list().then((data: Metodopago[]) => {
          this.mpS.setList(data); // Actualiza el Subject en el servicio
          this.dataSource.data = data; // Actualiza el dataSource local
        }).catch(error => {
          console.error('Error al refrescar la lista después de eliminar:', error);
        });
      },
      error: (err) => { // Manejo de errores para la operación de eliminación
        console.error('Error al eliminar el método de pago:', err);
        // alert('Error al eliminar el método de pago. Por favor, intente de nuevo.'); // Puedes usar un alert temporal o un snackbar
      }
    });
  }
}
