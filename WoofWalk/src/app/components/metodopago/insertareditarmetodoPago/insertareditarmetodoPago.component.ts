import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Metodopago } from '../../../model/metodopago'; // Asegúrate de que la ruta sea correcta
import { MetodopagoService } from '../../../service/metodopago.service'; 

@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarmetodoPago.component.html',
  styleUrl: './insertareditarmetodoPago.component.css'
})
export class InsertareditarMetodoPagoComponent  implements OnInit{
form: FormGroup = new FormGroup({})
  metododepago: Metodopago = new Metodopago()
  id: number = 0
  edicion: boolean = false

constructor(
    private formBuilder: FormBuilder,
    private mpS: MetodopagoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
     this.form = this.formBuilder.group({
      // Si el ID es autogenerado por backend, no deberías validarlo con 'required' en inserción.
      // Si es para edición, se puede mostrar como solo lectura.
      codigo: [''],
      // MEJORA OPCIONAL: Nombres de controles de formulario consistentes con el modelo
      nombre: ['', Validators.required], // Cambiado de 'nombre1' a 'nombre'
      descripcion: ['', Validators.required], // Cambiado de 'descripcion1' a 'descripcion'
      estado: ['', Validators.required] // Cambiado de 'estado1' a 'estado'
    });
   }

ngOnInit(): void {
 this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init(); // Llama a init() después de obtener el ID
    });
}
 aceptar() {
   // Tipado explícito para el retorno
    // 1. Mostrar validación visualmente al usuario si el formulario no es válido
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para que se muestren los errores
      console.error('El formulario no es válido. Por favor, completa los campos requeridos.');
      return; // Detiene la ejecución si el formulario es inválido
    }

    // 2. Asignar valores del formulario al objeto metododepago
    // CORRECCIÓN 2: Manejo de ID para inserción
    if (!this.edicion) {
      // Para inserción, no envíes el ID o establece a 0/null si el backend lo espera así para autogenerar
      this.metododepago.id = 0; // O null, o simplemente no lo asignes si el backend lo ignora
    } else {
      this.metododepago.id = this.form.value.codigo;
    }

    // Asignación de valores (usando los nombres de los controles corregidos si aplicaste la mejora)
    this.metododepago.nombre = this.form.value.nombre; // Si cambiaste a 'nombre'
    this.metododepago.descripcion = this.form.value.descripcion; // Si cambiaste a 'descripcion'
    this.metododepago.estado = this.form.value.estado; // Si cambiaste a 'estado'

    // Si mantuviste 'nombre1', 'descripcion1', 'estado1':
    // this.metododepago.nombre = this.form.value.nombre1;
    // this.metododepago.descripcion = this.form.value.descripcion1;
    // this.metododepago.estado = this.form.value.estado1;


    // 3. Realizar la operación (insertar o actualizar)
    if (this.edicion) {
      this.mpS.update(this.metododepago).subscribe({
        next: (data) => {
          console.log('Método de pago actualizado exitosamente:', data);
          // Actualizar la lista en el servicio y redirigir SOLO en caso de éxito
          this.mpS.list().then(updatedList => { // Usar .then() si list() devuelve Promise
            this.mpS.setList(updatedList);
            this.router.navigate(['metodosdepagos']); // CORRECCIÓN 5: Ruta plural
          }).catch(listError => {
            console.error('Error al actualizar la lista después de la edición:', listError);
            this.router.navigate(['metodosdepagos']); // Aún redirigir, pero registrar error
          });
        },
        error: (err) => { // CORRECCIÓN 3: Manejo de errores
          console.error('Error al actualizar el método de pago:', err);
          alert('Error al actualizar el método de pago. Por favor, intente de nuevo.'); // Feedback al usuario
        }
      });
    } else { // Caso de inserción
      this.mpS.insert(this.metododepago).subscribe({
        next: (data) => {
          console.log('Método de pago insertado exitosamente:', data);
          // Actualizar la lista en el servicio y redirigir SOLO en caso de éxito
          this.mpS.list().then(updatedList => { // Usar .then() si list() devuelve Promise
            this.mpS.setList(updatedList);
            this.router.navigate(['metodosdepagos']); // CORRECCIÓN 5: Ruta plural
          }).catch(listError => {
            console.error('Error al actualizar la lista después de la inserción:', listError);
            this.router.navigate(['metodosdepagos']); // Aún redirigir, pero registrar error
          });
        },
        error: (err) => { // CORRECCIÓN 3: Manejo de errores
          console.error('Error al insertar el método de pago:', err);
          alert('Error al registrar el método de pago. Por favor, intente de nuevo.'); // Feedback al usuario
        }
      });
    }
  }

  init() {
     // Tipado explícito para el retorno
    if (this.edicion) {
      this.mpS.listId(this.id).then(data => { // Usar .then() si listId() devuelve Promise
        // CORRECCIÓN 4: Usar patchValue para actualizar el formulario existente
        this.form.patchValue({
          codigo: data.id, // Asume que 'id' es la propiedad en tu modelo para el ID
          nombre: data.nombre, // Si cambiaste a 'nombre'
          descripcion: data.descripcion, // Si cambiaste a 'descripcion'
          estado: data.estado // Si cambiaste a 'estado'
        });

        // Si mantuviste 'nombre1', 'descripcion1', 'estado1':
        // this.form.patchValue({
        //   codigo: data.id,
        //   nombre1: data.nombre,
        //   descripcion1: data.descripcion,
        //   estado1: data.estado
        // });

      }).catch(err => {
        console.error(`Error al cargar el método de pago con ID ${this.id}:`, err);
        alert('Error al cargar los datos para edición. Redirigiendo a la lista.');
        this.router.navigate(['metodosdepagos']); // Redirige si hay error al cargar por ID
      });
    }
  }


}
