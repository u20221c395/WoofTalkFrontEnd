import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Rol } from '../../../model/rol'; // Asegúrate de que la ruta sea correcta
import { RolService } from '../../../service/rol.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-insertareditar',
  standalone: true,
  imports: [MatInputModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './insertareditarrol.component.html',
  styleUrl: './insertareditarrol.component.css'
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  rolSS: Rol = new Rol();
  id: number = 0; // Este es el ID capturado de la URL para edición
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    //Validar aqui desde el html
    this.form = this.formBuilder.group({
      codigo: [''],
      rol1: ['', Validators.required],
    })
  }

   aceptar() {
    if (this.form.valid) {
      this.rolSS.id = this.form.value.codigo
      this.rolSS.rol = this.form.value.rol1
      if (this.edicion) {
        this.rS.update(this.rolSS).subscribe(data => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      } else {
        this.rS.insert(this.rolSS).subscribe(() => {
          this.rS.list().subscribe(data => {
            this.rS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['roles'])
    }
  }


  init() {
      if (this.edicion) {
        this.rS.listId(this.id).subscribe(data => {
          this.form = new FormGroup({
            codigo: new FormControl(data.id),
            rol1: new FormControl(data.rol),
          })
        })
      }
    }
}
