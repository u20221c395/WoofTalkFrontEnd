import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Clima } from '../../../model/clima';
import { ClimaService } from '../../../service/clima.service';

@Component({
  selector: 'app-insertareditarclima',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarclima.component.html',
  styleUrl: './insertareditarclima.component.css'
})
export class InsertareditarclimaComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  clima: Clima = new Clima()
  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private cS: ClimaService,
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
      temperatura1: ['', Validators.required],
      humedad1: ['', Validators.required],
      condicion1: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.clima.idClima = this.form.value.codigo
      this.clima.temperatura = this.form.value.temperatura1
      this.clima.humedad = this.form.value.humedad1
      this.clima.condicion = this.form.value.condicion1
      if (this.edicion) {
        this.cS.update(this.clima).subscribe(data => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })
      } else {
        this.cS.insert(this.clima).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['climas'])
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idClima),
          temperatura1: new FormControl(data.temperatura),
          humedad1: new FormControl(data.humedad),
          condicion1: new FormControl(data.condicion)
        })
      })
    }
  }
}
