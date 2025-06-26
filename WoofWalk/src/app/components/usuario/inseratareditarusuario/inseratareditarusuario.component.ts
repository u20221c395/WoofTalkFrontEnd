import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { RolService } from '../../../service/rol.service';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../model/rol';
import { Calificacion } from '../../../model/calificacion';
import { CalificacionService } from '../../../service/calificacion.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-inseratareditarusuario',
    imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, CommonModule, MatRadioModule, MatSelectModule, MatButtonModule],
    templateUrl: './inseratareditarusuario.component.html',
    styleUrl: './inseratareditarusuario.component.css'
})
export class InseratareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})
  VALORPORDEFECTO: boolean = true;
  usuario: Usuario = new Usuario();

  id: number = 0;
  edicion: boolean = false;

  listarRoles: Rol[] = [];
  listarCalificaciones: Calificacion[] = [];

  constructor(
    private uS: UsuarioService,
    private formbuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rS: RolService,
    private cS: CalificacionService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formbuilder.group({
      codigo: [''],
      username1: ['', Validators.required],
      password1: ['', Validators.required],
      nombre1: ['', Validators.required],
      apellido1: ['', Validators.required],
      telefono1: ['', Validators.required],
      enabled1: ['', Validators.required],
      ro: ['', Validators.required],
      cali: ['', Validators.required]
    })

    this.rS.list().subscribe(data => {
      this.listarRoles = data
    })

    this.cS.list().subscribe(data => {
      this.listarCalificaciones = data
    })
  }

  cancelar() {
    this.router.navigate(['usuarios']);
  }

  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo
      this.usuario.username = this.form.value.username1
      this.usuario.password = this.form.value.password1
      this.usuario.nombre = this.form.value.nombre1
      this.usuario.apellido = this.form.value.apellido1
      this.usuario.telefono = this.form.value.telefono1
      this.usuario.enabled = this.form.value.enabled1
      this.usuario.rol.idRol = this.form.value.ro;
      this.usuario.calificacion.idCalificacion = this.form.value.cali;
      if (this.edicion) {
        this.uS.update(this.usuario).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      } else {
        this.uS.insert(this.usuario).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['usuarios'])
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          username1: new FormControl(data.username),
          password1: new FormControl(data.password),
          nombre1: new FormControl(data.nombre),
          apellido1: new FormControl(data.apellido),
          telefono1: new FormControl(data.telefono),
          enabled1: new FormControl(data.enabled),
          ro: new FormControl(data.rol.idRol),
          cali: new FormControl(data.calificacion.idCalificacion),
        })
      })
    }
  }
}
