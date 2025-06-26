import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Mascotas } from '../../../model/mascotas';
import { Usuario } from '../../../model/usuario';
import { Calificacion } from '../../../model/calificacion';
import { MascotasService } from '../../../service/mascotas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarmascota',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    MatFormField,
  ],
  templateUrl: './insertareditarmascota.component.html',
  styleUrl: './insertareditarmascota.component.css',
  providers: [provideNativeDateAdapter()]
})
export class InsertareditarmascotaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  mascota: Mascotas = new Mascotas()
  listaUsuarios: Usuario[] = []
  listaCalificaciones: Calificacion[] = []
  id: number = 0
  edicion: boolean = false


  tamanio: { value: string; viewValue: string }[] = [
    { value: 'Pequeño', viewValue: 'Pequeño' },
    { value: 'Mediano', viewValue: 'Mediano' },
    { value: 'Grande', viewValue: 'Grande' },
  ];

  constructor(
    private mS: MascotasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private cS: CalificacionService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre1: ['', Validators.required],
      raza1: ['', Validators.required],
      edad1: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      tamanio1: ['', Validators.required],
      observaciones1: ['', Validators.required],
      user1: ['', Validators.required],
      calificacion1: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    })

    this.cS.list().subscribe(data => {
      this.listaCalificaciones = data;
    })
  }

  cancelar() {
    this.router.navigate(['mascota']);
  }

  aceptar() {
    if (this.form.valid) {
      this.mascota.idMascota = this.form.value.codigo
      this.mascota.nombre = this.form.value.nombre1
      this.mascota.raza = this.form.value.raza1
      this.mascota.edad = this.form.value.edad1
      this.mascota.tamanio = this.form.value.tamanio1
      this.mascota.observaciones = this.form.value.observaciones1
      this.mascota.user.idUsuario = this.form.value.user1
      this.mascota.calificacion.idCalificacion = this.form.value.calificacion1
      if (this.edicion) {
        this.mS.update(this.mascota).subscribe(data => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          })
        })
      } else {
        this.mS.insert(this.mascota).subscribe(() => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['mascota'])
    }
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMascota),
          nombre1: new FormControl(data.nombre),
          raza1: new FormControl(data.raza),
          edad1: new FormControl(data.edad, [
            Validators.required,
            Validators.min(1),
            Validators.max(20)
          ]),
          tamanio1: new FormControl(data.tamanio),
          observaciones1: new FormControl(data.observaciones),
          user1: new FormControl(data.user.idUsuario),
          calificacion1: new FormControl(data.calificacion.idCalificacion),
        })
      })
    }
  }
}
