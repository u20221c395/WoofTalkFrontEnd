import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Enfermedad } from '../../../model/enfermedad';
import { EnfermedadService } from '../../../service/enfermedad.service';

@Component({
    selector: 'app-insertareditarenferm',
    imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
    templateUrl: './insertareditarenferm.component.html',
    styleUrl: './insertareditarenferm.component.css'
})
export class InsertareditarenfermComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  enfermedad: Enfermedad = new Enfermedad()
  id: number = 0
  edicion: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private enS: EnfermedadService,
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
      descripcion1: ['', Validators.required]
    })
  }

  aceptar() {
    if (this.form.valid) {
      this.enfermedad.idEnfermedad = this.form.value.codigo
      this.enfermedad.nombreEnfermedad = this.form.value.nombre1
      this.enfermedad.descripcionEnfermedad = this.form.value.descripcion1
      if (this.edicion) {
        this.enS.update(this.enfermedad).subscribe(data => {
          this.enS.list().subscribe(data => {
            this.enS.setList(data)
          })
        })
      } else {
        this.enS.insert(this.enfermedad).subscribe(() => {
          this.enS.list().subscribe(data => {
            this.enS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['enfermedades'])
    }
  }

  cancelar() {
    this.router.navigate(['enfermedades']);
  }

  init() {
    if (this.edicion) {
      this.enS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEnfermedad),
          nombre1: new FormControl(data.nombreEnfermedad),
          descripcion1: new FormControl(data.descripcionEnfermedad)
        })
      })
    }
  }

}
