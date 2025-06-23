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
import { Geolocalizacion } from '../../../model/geolocalizacion';
import { GeolocalizacionService } from '../../../service/geolocalizacion.service';
import { ClimaService } from '../../../service/clima.service';
import { Clima } from '../../../model/clima';

@Component({
  selector: 'app-insertareditgeolocalizacion',
  standalone: true, 
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
  listaClima:Clima[]=[]


  constructor(
    private geoS: GeolocalizacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cliS: ClimaService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      latitud1: ['', Validators.required],
      longitud1: ['', Validators.required],
      fecha1: ['', Validators.required],
      cl: ['', Validators.required]
    })

    this.cliS.list().subscribe(data => {
      this.listaClima = data
    })

  }
  aceptar(){
  if(this.form.valid){
    this.geolocalizacion.latitud=this.form.value.latitud1
    this.geolocalizacion.longitud=this.form.value.longitud1
    this.geolocalizacion.fecha=this.form.value.fecha1
    this.geolocalizacion.clima.idClima=this.form.value.cl
    this.geoS.insert(this.geolocalizacion).subscribe(data=>{
      this.geoS.list().subscribe(data=>{
        this.geoS.setList(data)
      })
    })
    this.router.navigate(['geolocalizacion'])
  }
  }
}
 