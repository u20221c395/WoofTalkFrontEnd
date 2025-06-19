import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Rol } from '../../../model/rol';
import { RolService } from '../../../service/rol.service';


@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarComponent implements OnInit {
form: FormGroup = new FormGroup({})
  rol: Rol = new Rol()
  id: number = 0
  edicion: boolean = false

  constructor(
      private formBuilder: FormBuilder,
      private rS: RolService,
      private router: Router,
      private route: ActivatedRoute
    ) {
       this.form = this.formBuilder.group({
        
        codigo: [''],
        rol: ['', Validators.required], 
       
      });
     }
  ngOnInit(): void {
 this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
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

  if (this.edicion) {
      this.rol.id = this.id; // Para edición, el ID viene de la URL
    } else {
      
      this.rol.id = 0; // O null si la propiedad 'id' en el modelo es 'id?: number | null;'
    }

    // CORRECCIÓN: La propiedad en tu modelo Rol es 'Rol' (con R mayúscula) y el formControlName es 'rol' (con r minúscula).
    // Asegúrate de que la asignación coincida con la propiedad de tu MODELO 'Rol'.
    this.rol.Rol = this.form.value.rol;
    console.log('Objeto Rol a enviar:', this.rol); // Log para depuración

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
    } else { 
      this.rS.insert(this.rol).subscribe({
        next: (data) => {
          console.log('Método de pago insertado exitosamente:', data);
          this.rS.list().then(updatedList => { 
            this.rS.setList(updatedList);
            this.router.navigate(['roles']); 
          }).catch(listError => {
            console.error('Error al actualizar la lista después de la inserción:', listError);
            this.router.navigate(['roles']); 
          });
        },
        error: (err) => { 
          console.error('Error al insertar el método de pago:', err);
          alert('Error al registrar el rol. Por favor, intente de nuevo.');
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
          rol: this.rol.Rol, // Asume que la propiedad del nombre del rol es 'Rol' (mayúscula)
        });
        console.log('init - Formulario parchado con valores:', this.form.value); // Log para depuración
      }).catch(err => {
        console.error(`Error al cargar el ROL con ID ${this.id}:`, err);
        alert('Error al cargar los datos para edición. Redirigiendo a la lista.');
        this.router.navigate(['roles']);
      });
    } else {
      // Para nueva inserción, inicializa el objeto rol y el formulario
      this.rol = new Rol();
      this.rol.id = 0; // Se asume 0 para IDs autogenerados en inserción si no se ingresa
      this.form.reset(); // Limpia el formulario
      console.log('init - Modo de inserción, formulario reseteado.'); // Log para depuración
    }
  }





}
