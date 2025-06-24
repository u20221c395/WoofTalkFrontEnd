import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { RolService } from '../../../service/rol.service';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../model/rol';
import { Calificacion } from '../../../model/calificacion';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-inseratareditarusuario',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule, MatRadioModule, MatSelectModule, MatButtonModule],
  templateUrl: './inseratareditarusuario.component.html',
  styleUrl: './inseratareditarusuario.component.css'
})
export class InseratareditarusuarioComponent implements OnInit {
  form: FormGroup;
  VALORPORDEFECTO: boolean = true;
  usuario: Usuario = new Usuario();

  id: number = 0;
  edicion: boolean = false;

  listarRoles: Rol[] = [];
  listarCalificaciones: Calificacion[] = [];

  constructor(
    private uS: UsuarioService,
    private formbuilder: FormBuilder,
    private router: Router,
    private rS: RolService,
    private cS: CalificacionService,
    private route: ActivatedRoute
  ) {
    this.form = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      enabled: ['', Validators.required],
      ro: ['', Validators.required], // ID del rol seleccionado
      cali: ['', Validators.required] // ID de la calificación seleccionada
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.rS.list().then(data => {
      this.listarRoles = data;
    });

    this.cS.list().subscribe(data => {
      this.listarCalificaciones = data;
    });
  }

  init(): void {
    if (this.edicion) {
      // Lógica para edición (no es el foco de esta corrección, pero se mantendría aquí)
      // Asegúrate de que, al cargar, si el backend devuelve UserDTO con rolId y calificacionId,
      // los asignes a this.form.patchValue({ ro: data.rolId, cali: data.calificacionId })
    }
  }

  aceptar() {
    if (this.form.valid) {
      if (this.edicion) {
        this.usuario.id = this.id;
      } else {
        this.usuario.id = null; // Sigue siendo null para nuevas inserciones, para que el backend autogenere
      }

      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.enabled = this.form.value.enabled;

      // *** CORRECCIÓN CLAVE: Asignar directamente los IDs ***
      this.usuario.rolId = this.form.value.ro; // Asigna el ID del rol
      this.usuario.calificacionId = this.form.value.cali; // Asigna el ID de la calificación

      this.uS.insert(this.usuario).subscribe(data => {
        this.uS.list().subscribe(updatedList => {
          this.uS.setList(updatedList);
          this.router.navigate(['usuarios']);
        });
      }, error => { // Manejo de errores
        console.error('Error al insertar usuario:', error);
        alert('Error al registrar el usuario. Por favor, intente de nuevo.');
      });
    }
  }
}
