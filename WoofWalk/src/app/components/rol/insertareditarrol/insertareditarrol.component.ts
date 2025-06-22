import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Rol } from '../../../model/rol'; // Asegúrate de que la ruta sea correcta
import { RolService } from '../../../service/rol.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup; // Inicializado en el constructor
  rol: Rol = new Rol();
  id: number = 0; // Este es el ID capturado de la URL para edición
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: false }], // Campo para el ID. Inicialmente habilitado.
      rol: ['', Validators.required], // Campo para el nombre del Rol
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id']; // Captura el ID de la URL
      this.edicion = data['id'] != null; // Determina si es modo edición
      console.log('ngOnInit - ID de la URL:', this.id, 'Modo edición:', this.edicion); // Log para depuración
      this.init(); // Llama a init() después de obtener el ID
    });
  }

  aceptar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.error('El formulario no es válido. Por favor, completa los campos requeridos.');
      return;
    }

    // El objeto 'rol' siempre se crea como 'new Rol()' al inicio del componente
    // Por defecto, 'rol.id' será 0 o undefined.
    // Solo si es edición, le asignamos el ID de la URL.
    if (this.edicion) {
      this.rol.id = this.id; // Para edición, el ID viene de la URL
    } else {
    }

    this.rol.rol = this.form.value.rol; // Lee el valor del control 'rol' (minúscula) del formulario

    console.log('Objeto Rol a enviar:', this.rol); // Log para depuración: ¡Verifica el ID y el Rol aquí!

    if (this.edicion) {
      this.rS.update(this.rol).subscribe({
        next: (data) => {
          console.log('Rol actualizado exitosamente:', data);
          this.rS.list().then(updatedList => {
            this.rS.setList(updatedList);
            this.router.navigate(['roles']);
          }).catch(listError => {
            console.error('Error al actualizar la lista después de la edición:', listError);
            this.router.navigate(['roles']);
          });
        },
        error: (err) => {
          console.error('Error al actualizar el rol:', err);
          alert('Error al actualizar el rol. Por favor, intente de nuevo.');
        }
      });
    } else { // Caso de inserción
      this.rS.insert(this.rol).subscribe({
        next: (data) => {
          console.log('Rol insertado exitosamente:', data);
          this.rS.list().then(updatedList => {
            this.rS.setList(updatedList);
            this.router.navigate(['roles']);
          }).catch(listError => {
            console.error('Error al actualizar la lista después de la inserción:', listError);
            this.router.navigate(['roles']);
          });
        },
        error: (err) => {
          console.error('Error al insertar el rol:', err); // Mensaje corregido
          alert('Error al registrar el rol. Por favor, intente de nuevo.'); // Mensaje corregido
        }
      });
    }
  }

  init() {
    if (this.edicion) {
      console.log('init - Cargando datos para ID:', this.id); // Log para depuración
      this.rS.listId(this.id).then(data => {
        this.rol = data; // Carga el objeto completo del servicio
        console.log('init - Datos de rol cargados:', this.rol); // Log para depuración

        this.form.patchValue({
          codigo: this.rol.id, // Asume que la propiedad ID en el modelo Rol es 'id' (minúscula)
          rol: this.rol.rol, // Asume que la propiedad del nombre del rol es 'Rol' (mayúscula)
        });
        // Deshabilita el campo ID en edición
        this.form.get('codigo')?.disable(); 
        console.log('init - Formulario parchado con valores y ID deshabilitado.'); // Log para depuración
      }).catch(err => {
        console.error(`Error al cargar el ROL con ID ${this.id}:`, err);
        alert('Error al cargar los datos para edición. Redirigiendo a la lista.');
        this.router.navigate(['roles']);
      });
    } else {
      // Para nueva inserción, inicializa el objeto rol y el formulario
      this.rol = new Rol(); // ID de this.rol será 0 o null por defecto
      this.form.reset(); // Limpia el formulario
      // Asegúrate de que el campo 'codigo' esté habilitado para entrada en modo inserción
      this.form.get('codigo')?.enable(); 
      console.log('init - Modo de inserción, formulario reseteado y ID habilitado.'); // Log para depuración
    }
  }
}
