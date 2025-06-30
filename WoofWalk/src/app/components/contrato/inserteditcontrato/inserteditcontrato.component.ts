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
import { Contrato } from '../../../model/contrato';
import { Mascotas } from '../../../model/mascotas';
import { ContratoService } from '../../../service/contrato.service';
import { MascotasService } from '../../../service/mascotas.service';
import { Metodopago } from '../../../model/metodopago';
import { MetodopagoService } from '../../../service/metodopago.service';
@Component({
  selector: 'app-inserteditcontrato',
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
  templateUrl: './inserteditcontrato.component.html',
  styleUrl: './inserteditcontrato.component.css'
})
export class InserteditcontratoComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  contrato: Contrato = new Contrato()

  listaMascota: Mascotas[] = []
  listaMetodoPago: Metodopago[] = []
  id: number = 0
  edicion: boolean = false

  constructor(
    private coS: ContratoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private meS: MetodopagoService,
    private maS: MascotasService
  ) {

  }
  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      fecha1: ['', Validators.required],
      fecha2: ['', Validators.required],
      monto1: ['', Validators.required],
      ma: ['', Validators.required],
      me: ['', Validators.required]
    })

    this.maS.list().subscribe(data => {
      this.listaMascota = data
    })
    this.meS.list().subscribe(data => {
      this.listaMetodoPago = data
    })

  }

  cancelar() {
    this.router.navigate(['contrato']);
  }


  aceptar() {
    if (this.form.valid) {
      this.contrato.id_Contrato = this.form.value.codigo
      this.contrato.fecha_inicio = this.form.value.fecha1
      this.contrato.fecha_fin = this.form.value.fecha2
      this.contrato.monto = this.form.value.monto1
      this.contrato.mascota.idMascota = this.form.value.ma
      this.contrato.metodopago.idMetodoPago = this.form.value.me
      if (this.edicion) {
        this.coS.update(this.contrato).subscribe(data => {
          this.coS.list().subscribe(data => {
            this.coS.setList(data)
          })
        })
      } else {
        this.coS.insert(this.contrato).subscribe(() => {
          this.coS.list().subscribe(data => {
            this.coS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['contrato'])
    }
  }

  init() {
    if (this.edicion) {
      this.coS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id_Contrato),
          fecha1: new FormControl(data.fecha_inicio),
          fecha2: new FormControl(data.fecha_fin),
          monto1: new FormControl(data.monto),
          ma: new FormControl(data.mascota),
          me: new FormControl(data.metodopago),
        })
      })
    }
  }
}

