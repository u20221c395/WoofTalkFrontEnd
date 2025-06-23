import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Enfermedad } from '../../../model/enfermedad';
import { EnfermedadService } from '../../../service/enfermedad.service';

@Component({
  selector: 'app-insertareditarenferm',
  standalone: true,
 imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarenferm.component.html',
  styleUrl: './insertareditarenferm.component.css'
})
export class InsertareditarenfermComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  enfermedad: Enfermedad = new Enfermedad()
  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private eS: EnfermedadService,
    private router: Router,
    private route: ActivatedRoute
  ) { this.form = this.formBuilder.group({
      
      codigo: [''],       // MEJORA OPCIONAL: Nombres de controles de formulario consistentes con el modelo
      nombre: ['', Validators.required], // Cambiado de 'nombre1' a 'nombre'
      descripcion: ['', Validators.required], // Cambiado de 'descripcion1' a 'descripcion'
    }); }

 ngOnInit(): void {
   this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    console.log('ngOnInit - ID de la URL:', this.id, 'Modo edición:', this.edicion); // <--- Línea añadida
    this.init();
  });
  }

  aceptar() {
   if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.error('El formulario no es válido. Por favor, completa los campos requeridos.');
      return;
    }

    if (this.edicion) {
      this.enfermedad.idEnfermedad = this.id;
    } else {
      this.enfermedad.idEnfermedad = 0;
    }

    // Usar getRawValue() para obtener los valores de controles deshabilitados si fuera necesario.
    // En este caso, como this.enfermedad.IdEnfermedad se asigna desde this.id, no es un problema.
    this.enfermedad.nombreEnfermedad = this.form.value.nombre;
    this.enfermedad.descripcionEnfermedad = this.form.value.descripcion;

    if (this.edicion) {
      this.eS.update(this.enfermedad).subscribe({
        next: (data) => {
          console.log('Enfermedad actualizada exitosamente:', data);
          this.eS.list().then(updatedList => {
            this.eS.setList(updatedList);
            this.router.navigate(['enfermedades']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar la enfermedad:', err);
          alert('Error al actualizar la enfermedad. Por favor, intente de nuevo.');
        }
      });
    } else {
      this.eS.insert(this.enfermedad).subscribe({
        next: (data) => {
          console.log('Enfermedad insertada exitosamente:', data);
          this.eS.list().then(updatedList => {
            this.eS.setList(updatedList);
            this.router.navigate(['enfermedades']);
          });
        },
        error: (err) => {
          console.error('Error al insertar la enfermedad:', err);
          alert('Error al registrar la enfermedad. Por favor, intente de nuevo.');
        }
      });
    }
  }

  init() {
    if (this.edicion) {
      console.log('init - Cargando datos para ID:', this.id);
      this.eS.listId(this.id).then(data => {
        this.enfermedad = data;
        console.log('init - Datos de enfermedad cargados:', this.enfermedad);
        console.log('init - ID de la enfermedad para patchValue:', this.enfermedad.idEnfermedad);

        // CORRECCIÓN CLAVE: Incluir 'codigo' directamente en patchValue
        this.form.patchValue({
          codigo: this.enfermedad.idEnfermedad, // El ID ahora está en el objeto de parche
          nombre: this.enfermedad.nombreEnfermedad,
          descripcion: this.enfermedad.descripcionEnfermedad
        });

        // Deshabilita el control *después* de que el valor ha sido parchado
        this.form.get('codigo')?.disable(); // Deshabilita el control para hacerlo de solo lectura

        console.log('init - Formulario parchado con valores y ID deshabilitado.');
      }).catch(err => {
        console.error(`Error al cargar la enfermedad con ID ${this.id}:`, err);
        alert('Error al cargar los datos para edición. Redirigiendo a la lista.');
        this.router.navigate(['enfermedades']);
      });
    } else {
      this.enfermedad = new Enfermedad();
      this.enfermedad.idEnfermedad = 0;
      this.form.reset(); // Usar reset() sin argumentos limpia todos los controles
      // Asegurar que el control 'codigo' esté habilitado si es una nueva inserción
      this.form.get('codigo')?.enable();
      console.log('init - Modo de inserción, formulario reseteado y ID habilitado.');
    }
  }
}
