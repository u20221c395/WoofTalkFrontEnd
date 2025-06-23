import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mascotas } from '../../../model/mascotas';
import { Usuario } from '../../../model/usuario';
import { Calificacion } from '../../../model/calificacion';
import { MascotasService } from '../../../service/mascotas.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditarmascota',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  templateUrl: './insertareditarmascota.component.html',
  styleUrl: './insertareditarmascota.component.css',
  providers: [provideNativeDateAdapter()],
})
export class InsertareditarmascotaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  valorDefecto: boolean = true;
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
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      tamanio: ['', Validators.required],
      observaciones: ['', Validators.required],
      user: ['', Validators.required],
      calificacion: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.cS.list().subscribe((data) => {
      this.listaCalificaciones = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.mascota.nombre = this.form.value.nombre;
      this.mascota.raza = this.form.value.raza;
      this.mascota.edad = this.form.value.edad;
      this.mascota.tamanio = this.form.value.tamanio;
      this.mascota.observaciones = this.form.value.observaciones;
      this.mascota.user = this.form.value.user;
      this.mascota.calificacion = this.form.value.calificacion;
      this.mS.insert(this.mascota).subscribe((data) => {
        this.mS.list().subscribe((data) => {
          this.mS.setList(data);
        });
      });

      this.router.navigate(['mascota']);
    }
  }
}
