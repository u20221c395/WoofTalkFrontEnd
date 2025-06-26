import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Solicitud } from '../../../model/solicitud';
import { Usuario } from '../../../model/usuario';
import { Metodopago } from '../../../model/metodopago';
import { SolicitudService } from '../../../service/solicitud.service';
import { UsuarioService } from '../../../service/usuario.service';
import { MetodopagoService } from '../../../service/metodopago.service';

@Component({
    selector: 'app-inserteditsolicitud',
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
    templateUrl: './inserteditsolicitud.component.html',
    styleUrl: './inserteditsolicitud.component.css'
})
export class InserteditsolicitudComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  solicitud: Solicitud = new Solicitud()
  listaUsuario: Usuario[] = []
  listaMetododePago: Metodopago[] = []
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private solS: SolicitudService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usuS: UsuarioService,
    private metS: MetodopagoService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      fecha1: ['', Validators.required],
      us: ['', Validators.required],
      me: ['', Validators.required]
    })

    this.usuS.list().subscribe(data => {
      this.listaUsuario = data
    })

    this.metS.list().subscribe(data => {
      this.listaMetododePago = data
    })
  }

  cancelar() {
    this.router.navigate(['solicitud']);
  }

  aceptar() {
    if (this.form.valid) {
      this.solicitud.idSolicitud = this.form.value.codigo
      this.solicitud.fecha = this.form.value.fecha1
      this.solicitud.user.idUsuario = this.form.value.us
      this.solicitud.metodoPago.idMetodoPago = this.form.value.me
      if (this.edicion) {
        this.solS.update(this.solicitud).subscribe(data => {
          this.solS.list().subscribe(data => {
            this.solS.setList(data)
          })
        })
      } else {
        this.solS.insert(this.solicitud).subscribe(() => {
          this.solS.list().subscribe(data => {
            this.solS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['solicitud'])
    }
  }

  init() {
    if (this.edicion) {
      this.solS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idSolicitud),
          fecha1: new FormControl(data.fecha),
          us: new FormControl(data.user.idUsuario),
          me: new FormControl(data.metodoPago.idMetodoPago)
        })
      })
    }
  }
}
