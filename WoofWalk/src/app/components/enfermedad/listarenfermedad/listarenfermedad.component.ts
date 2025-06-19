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
    // CORRECCIÓN: Usar .then() en lugar de .subscribe() para consumir la Promesa de eS.list()
    // CORRECCIÓN: Tipado explícito para 'data'
    this.eS.list().then((data: Enfermedad[]) => {
      this.dataSource.data = data; // Asigna los datos a la propiedad .data
    }).catch(error => {
      console.error('Error al cargar la lista de enfermedades:', error);
      // Aquí podrías mostrar un mensaje al usuario, por ejemplo, con un snackbar
    });

    // Suscribirse al Subject del servicio para actualizaciones en tiempo real
    // eS.getList() devuelve un Observable, por lo que .subscribe() es correcto aquí
    this.eS.getList().subscribe((data: Enfermedad[]) => { // Tipado explícito para 'data'
      this.dataSource.data = data; // Actualiza los datos de la tabla
    });
  }

  eliminar(id: number) {
    this.eS.deleteC(id).subscribe({
      next: () => {
        console.log(`Enfermedad con ID ${id} eliminada.`);
        // Después de eliminar, refresca la lista llamando a eS.list()
        // CORRECCIÓN: eS.list() devuelve una Promesa, usa .then()
        this.eS.list().then((data: Enfermedad[]) => {
          this.eS.setList(data); // Actualiza el Subject en el servicio
          this.dataSource.data = data; // Actualiza el dataSource local
        }).catch(error => {
          console.error('Error al refrescar la lista después de eliminar:', error);
        });
      },
      error: (err) => { // Manejo de errores para la operación de eliminación
        console.error('Error al eliminar la enfermedad:', err);
        // alert('Error al eliminar la enfermedad. Por favor, intente de nuevo.');
      }
    });
  }
}
