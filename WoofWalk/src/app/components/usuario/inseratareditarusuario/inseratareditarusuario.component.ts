import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  standalone: true,
  imports: [ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      CommonModule,
      MatRadioModule,
      MatSelectModule,
      MatButtonModule],
  templateUrl: './inseratareditarusuario.component.html',
  styleUrl: './inseratareditarusuario.component.css'
})
export class InseratareditarusuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({})

  id: number = 0;
  edicion: boolean = false;


  usu : Usuario=new Usuario()
  listarRoles: Rol[] = []
  listarCalificaciones: Calificacion[] = []

  constructor(
    private uS: UsuarioService,
    private formbuilder: FormBuilder,
    private router: Router,
    private rS: RolService,
    private cS: CalificacionService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init()
    });
    this.form = this.formbuilder.group({
      codigo: [''],
      username1: ['', Validators.required],
      password1: ['', Validators.required],
      nombre1: ['', Validators.required],
      apellido1: ['', Validators.required],
      telefono1: ['', Validators.required],
      enabled1: ['', Validators.required],
      ro: ['', Validators.required], // ID del rol seleccionado
      cali: ['', Validators.required] // ID de la calificación seleccionada
    })



    this.rS.list().subscribe(data => {
      this.listarRoles = data;
    });

    this.cS.list().subscribe(data => {
      this.listarCalificaciones = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usu.id = this.form.value.codigo
      this.usu.username = this.form.value.username1
      this.usu.password = this.form.value.password1
      this.usu.nombre = this.form.value.nombre1
      this.usu.apellido = this.form.value.apellido1
      this.usu.telefono = this.form.value.telefono1
      this.usu.enabled = this.form.value.enabled1
      this.usu.rol=this.form.value.ro
      this.usu.calificacion=this.form.value.cali

      this.usu.rol = { id: this.form.value.ro } as Rol;
      this.usu.calificacion = { id: this.form.value.cali } as Calificacion;

      this.uS.insert(this.usu).subscribe(data=>{
        this.uS.getList().subscribe(data=>{
          this.uS.setList(data)
        })
      })
     
  
      //Redirigir desde app.route.ts
      this.router.navigate(['usuarios'])
    }
  }
 init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          username1: new FormControl(data.username),
          password1: new FormControl(data.id),
          nombre1: new FormControl(data.nombre),
          apellido1: new FormControl(data.apellido),
          telefono1: new FormControl(data.telefono),
          enabled1: new FormControl(data.enabled),
          ro: new FormControl(data.rol),
          cali: new FormControl(data.calificacion)
        })
      })
    }
  }

  
  
}
