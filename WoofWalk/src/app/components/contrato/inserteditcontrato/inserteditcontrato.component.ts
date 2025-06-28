import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
=======
import { Router } from '@angular/router';
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
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
<<<<<<< HEAD


  valordefecto: boolean = true;
   id: number = 0;
  edicion: boolean = false;

=======
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
  contrato: Contrato = new Contrato()

  listaMascota: Mascotas[] = []
  listaMetodoPago: Metodopago[] = []

  constructor(
    private coS: ContratoService,
    private formBuilder: FormBuilder,
    private router: Router,
<<<<<<< HEAD
    private route: ActivatedRoute,
=======
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
    private meS: MetodopagoService,
    private maS: MascotasService
  ) {

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
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


<<<<<<< HEAD
 aceptar() {
  if (this.form.valid) {
    const contratoDTO: any = {
      fecha_inicio: this.form.value.fecha1,
      fecha_fin: this.form.value.fecha2,
      monto: this.form.value.monto1,
      idMascota: this.form.value.ma,
      idMetodoPago: this.form.value.me
    };

    if (this.edicion) {
      contratoDTO.id_Contrato = this.id; // Solo si es edición
      this.coS.update(contratoDTO).subscribe(() => {
        this.coS.list().subscribe(data => {
          this.coS.setList(data);
        });
      });
    } else {
      this.coS.insert(contratoDTO).subscribe(() => {
        this.coS.list().subscribe(data => {
          this.coS.setList(data);
        });
      });
    }

    this.router.navigate(['contrato']);
  }
}

}

=======
  aceptar() {
    if (this.form.valid) {
      this.contrato.fecha_inicio = this.form.value.fecha1
      this.contrato.fecha_fin = this.form.value.fecha2
      this.contrato.monto = this.form.value.monto1
      this.contrato.mascota.idMascota = this.form.value.ma
      this.contrato.metodopago.idMetodoPago = this.form.value.me
      this.coS.insert(this.contrato).subscribe(data => {
        this.coS.list().subscribe(data => {
          this.coS.setList(data)
        })
      })
      this.router.navigate(['contrato'])
    }
  }
}
>>>>>>> 60486da0800bb2fbd576ab5ff825c3564c23271c
