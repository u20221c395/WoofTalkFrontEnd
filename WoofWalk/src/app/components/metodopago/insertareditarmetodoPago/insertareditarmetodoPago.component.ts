import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Metodopago } from '../../../model/metodopago';
import { MetodopagoService } from '../../../service/metodopago.service';

@Component({
    selector: 'app-insertareditar',
    imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './insertareditarmetodoPago.component.html',
    styleUrl: './insertareditarmetodoPago.component.css'
})
export class InsertareditarMetodoPagoComponent implements OnInit {


  form: FormGroup = new FormGroup({})
  metodopago: Metodopago = new Metodopago()
  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private mS: MetodopagoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    //Validar aqui desde el html
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre1: ['', Validators.required],
      descripcion1: ['', Validators.required],
      estado1: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.metodopago.idMetodoPago = this.form.value.codigo
      this.metodopago.nombrepago = this.form.value.nombre1
      this.metodopago.descripcion = this.form.value.descripcion1
      this.metodopago.estado = this.form.value.estado1
      if (this.edicion) {
        this.mS.update(this.metodopago).subscribe(data => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          })
        })
      } else {
        this.mS.insert(this.metodopago).subscribe(() => {
          this.mS.list().subscribe(data => {
            this.mS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['metodosdepagos'])
    }
  }

  cancelar() {
    this.router.navigate(['metodosdepagos']);
  }

  init() {
    if (this.edicion) {
      this.mS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMetodoPago),
          nombre1: new FormControl(data.nombrepago),
          descripcion1: new FormControl(data.descripcion),
          estado1: new FormControl(data.estado)
        })
      })
    }
  }

}
