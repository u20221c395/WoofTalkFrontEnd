import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../service/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RolService } from '../../../service/rol.service';
import { CalificacionService } from '../../../service/calificacion.service';
import { Rol } from '../../../model/rol';
import { Calificacion } from '../../../model/calificacion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inseratareditarusuario',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './inseratareditarusuario.component.html',
  styleUrl: './inseratareditarusuario.component.css'
})
export class InseratareditarusuarioComponent implements OnInit {
  form: FormGroup;
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;
  listarRoles: Rol[] = [];
  listarCalificaciones: Calificacion[] = [];

  constructor(
    private uS: UsuarioService,
    private formbuilder: FormBuilder,
    private router: Router,
    private rS: RolService,
    private cS: CalificacionService,
    private route: ActivatedRoute
  ) {
    this.form = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      enabled: [true, Validators.required], // ✅ booleano real
      ro: [, Validators.required],
      cali: [, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = !!data['id'];
      // si es edición, cargar usuario aquí
    });

    this.rS.list().then(data => (this.listarRoles = data));
    this.cS.list().subscribe(data => (this.listarCalificaciones = data));
  }

  aceptar(): void {
    if (this.form.valid) {
      if (this.edicion) {
        this.usuario.id = this.id;
      }
      this.usuario.username = this.form.value.username;
      this.usuario.password = this.form.value.password;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.enabled = this.form.value.enabled;

      const r = this.listarRoles.find(r => r.id === this.form.value.ro);
      if (r) this.usuario.rol = r;

      const c = this.listarCalificaciones.find(c => c.id === this.form.value.cali);
      if (c) this.usuario.calificacion = c;

      this.uS.insert(this.usuario).subscribe(() => {
        this.uS.list().subscribe(list => {
          this.uS.setList(list);
          this.router.navigate(['usuarios']);
        });
      });
    }
  }
}
