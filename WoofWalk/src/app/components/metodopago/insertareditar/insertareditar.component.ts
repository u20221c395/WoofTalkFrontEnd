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
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit{
form: FormGroup = new FormGroup({})
  metododepago: Metodopago = new Metodopago()
  id: number = 0
  edicion: boolean = false

constructor(
    private formBuilder: FormBuilder,
    private mpS: MetodopagoService,
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
      this.metododepago.id = this.form.value.codigo
      this.metododepago.nombre = this.form.value.nombre1
      this.metododepago.descripcion = this.form.value.descripcion1
      this.metododepago.estado = this.form.value.estado1
      if (this.edicion) {
        this.mpS.update(this.metododepago).subscribe(data => {
          this.mpS.list().subscribe(data => {
            this.mpS.setList(data)
          })
        })
      } else {
        this.mpS.insert(this.metododepago).subscribe(() => {
          this.mpS.list().subscribe(data => {
            this.mpS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['metodosdepago'])
    }
  }

  init() {
    if (this.edicion) {
      this.mpS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre1: new FormControl(data.nombre),
          descripcion1: new FormControl(data.descripcion),
          estado1: new FormControl(data.estado),
        })
      })
    }
  }


}
