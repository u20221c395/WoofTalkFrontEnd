import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Calificacion } from '../../../model/calificacion';
import { CalificacionService } from '../../../service/calificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-insertareditar',
    imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './insertareditar.component.html',
    styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  calificacion: Calificacion = new Calificacion()
  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private cS: CalificacionService,
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
      calificacion1: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.calificacion.idCalificacion = this.form.value.codigo
      this.calificacion.calificacion = this.form.value.calificacion1
      if (this.edicion) {
        this.cS.update(this.calificacion).subscribe(data => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })
      } else {
        this.cS.insert(this.calificacion).subscribe(() => {
          this.cS.list().subscribe(data => {
            this.cS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['calificaciones'])
    }
  }
  cancelar() {
    this.router.navigate(['calificaciones']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCalificacion),
          calificacion1: new FormControl(data.calificacion, [
            Validators.required,
            Validators.min(1),
            Validators.max(10)
          ])
        });
      });
    }
  }
}
