import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { GeolocalizacionService } from '../../../service/geolocalizacion.service';
import { PaseoService } from '../../../service/paseo.service';
import { Paseo } from '../../../model/paseo';
import { Mascotas } from '../../../model/mascotas';
import { Geolocalizacion } from '../../../model/geolocalizacion';
import { MascotasService } from '../../../service/mascotas.service';

@Component({
    selector: 'app-inserteditpaseo',
    providers: [provideNativeDateAdapter()],
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        CommonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './inserteditpaseo.component.html',
    styleUrl: './inserteditpaseo.component.css'
})
export class InserteditpaseoComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  paseo: Paseo = new Paseo()
  listaMascotas: Mascotas[] = []
  listaGeolocalizacion: Geolocalizacion[] = []
  listaUsuario: Usuario[] = []


  constructor(
    private pasS: PaseoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuS: UsuarioService,
    private geoS: GeolocalizacionService,
    private masS: MascotasService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      descripcion1: ['', Validators.required],
      fecha1: ['', Validators.required],
      fecha2: ['', Validators.required],
      us: ['', Validators.required],
      ma: ['', Validators.required],
      ge: ['', Validators.required],
    })

    this.usuS.list().subscribe(data => {
      this.listaUsuario = data
    })

    this.geoS.list().subscribe(data => {
      this.listaGeolocalizacion = data
    })

    this.masS.list().subscribe(data => {
      this.listaMascotas = data
    })

  }

  cancelar() {
    this.router.navigate(['paseo']);
  }

  aceptar() {
    if (this.form.valid) {
      this.paseo.descripcion = this.form.value.descripcion1
      this.paseo.fecha_inicio = this.form.value.fecha1
      this.paseo.fecha_fin = this.form.value.fecha2
      this.paseo.mascotas.idMascota = this.form.value.ma
      this.paseo.geolocalizacion.idGeolocalizacion = this.form.value.ge
      this.paseo.user.idUsuario = this.form.value.us
      this.pasS.insert(this.paseo).subscribe(data => {
        this.pasS.list().subscribe(data => {
          this.pasS.setList(data)
        })
      })
      this.router.navigate(['paseo'])
    }
  }
}
