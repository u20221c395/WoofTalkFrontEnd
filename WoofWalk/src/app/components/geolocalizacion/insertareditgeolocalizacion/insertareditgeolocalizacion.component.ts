import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Geolocalizacion } from '../../../model/geolocalizacion';
import { GeolocalizacionService } from '../../../service/geolocalizacion.service';
import { ClimaService } from '../../../service/clima.service';
import { Clima } from '../../../model/clima';

@Component({
  selector: 'app-insertareditgeolocalizacion',
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
  templateUrl: './insertareditgeolocalizacion.component.html',
  styleUrl: './insertareditgeolocalizacion.component.css'
})
export class InsertareditgeolocalizacionComponent implements OnInit {

  form: FormGroup = new FormGroup({})

  geolocalizacion: Geolocalizacion = new Geolocalizacion()
  listaClima: Clima[] = []
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private geoS: GeolocalizacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cliS: ClimaService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      latitud1: ['', Validators.required],
      longitud1: ['', Validators.required],
      fecha1: ['', Validators.required],
      cl: ['', Validators.required]
    })

    this.cliS.list().subscribe(data => {
      this.listaClima = data
    })

  }

  cancelar() {
    this.router.navigate(['geolocalizacion']);
  }

  aceptar() {
    if (this.form.valid) {
      this.geolocalizacion.idGeolocalizacion = this.form.value.codigo
      this.geolocalizacion.latitud = this.form.value.latitud1
      this.geolocalizacion.longitud = this.form.value.longitud1
      this.geolocalizacion.fecha = this.form.value.fecha1
      this.geolocalizacion.clima.idClima = this.form.value.cl
      if (this.edicion) {
        this.geoS.update(this.geolocalizacion).subscribe(data => {
          this.geoS.list().subscribe(data => {
            this.geoS.setList(data)
          })
        })
      } else {
        this.geoS.insert(this.geolocalizacion).subscribe(() => {
          this.geoS.list().subscribe(data => {
            this.geoS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['geolocalizacion'])
    }
  }

  init() {
    if (this.edicion) {
      this.geoS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idGeolocalizacion),
          latitud1: new FormControl(data.latitud),
          longitud1: new FormControl(data.longitud),
          fecha1: new FormControl(data.fecha),
          cl: new FormControl(data.clima.idClima)
        })
      })
    }
  }
}
