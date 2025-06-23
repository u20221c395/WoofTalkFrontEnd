import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Mascotas } from '../../../model/mascotas';
import { Usuario } from '../../../model/usuario';
import { Calificacion } from '../../../model/calificacion';
import { MascotasService } from '../../../service/mascotas.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarmascota',
  standalone: true,
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
  providers: [provideNativeDateAdapter()],
})
export class InsertareditarmascotaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
 
  mascota: Mascotas = new Mascotas();
  listaUsuarios: Usuario[] = [];
  listaCalificaciones: Calificacion[] = [];

  tamanio: { value: string; viewValue: string }[] = [
    { value: 'Pequeño', viewValue: 'Pequeño' },
    { value: 'Mediano', viewValue: 'Mediano' },
    { value: 'Grande', viewValue: 'Grande' },
  ];

  constructor(
    private mS: MascotasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuarioService,
    private cS: CalificacionService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre1: ['', Validators.required],
      raza1: ['', Validators.required],
      edad1: ['', Validators.required],
      tamanio1: ['', Validators.required],
      observaciones1: ['', Validators.required],
      user1: ['', Validators.required],
      calificacion1: ['', Validators.required],
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    this.cS.list().subscribe(data => {
      this.listaCalificaciones = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.mascota.nombre = this.form.value.nombre1;
      this.mascota.raza = this.form.value.raza1;
      this.mascota.edad = this.form.value.edad1;
      this.mascota.tamanio = this.form.value.tamanio1;
      this.mascota.observaciones = this.form.value.observaciones1;
      this.mascota.user = {id: this.form.value.user1} as Usuario;
      this.mascota.calificacion = {id: this.form.value.calificacion1} as Calificacion;
      this.mS.insert(this.mascota).subscribe(() => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });

      this.router.navigate(['mascota']);
    }
  }
}