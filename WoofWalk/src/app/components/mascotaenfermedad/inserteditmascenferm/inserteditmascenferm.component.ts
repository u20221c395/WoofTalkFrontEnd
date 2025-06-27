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
import { Mascotas } from '../../../model/mascotas';
import { MascotasService } from '../../../service/mascotas.service';
import { Enfermedad } from '../../../model/enfermedad';
import { Mascotaenfermedad } from '../../../model/mascotaenfermedad';
import { EnfermedadService } from '../../../service/enfermedad.service';
import { MascotaenfermedadService } from '../../../service/mascotaenfermedad.service';

@Component({
    selector: 'app-inserteditmascenferm',
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
    templateUrl: './inserteditmascenferm.component.html',
    styleUrl: './inserteditmascenferm.component.css'
})
export class InserteditmascenfermComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  mascotaenfermedad: Mascotaenfermedad = new Mascotaenfermedad()
  listaMascota: Mascotas[] = []
  listaEnfermedad: Enfermedad[] = []
  id: number = 0
  edicion: boolean = false

  constructor(
    private mefS: MascotaenfermedadService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private enfS: EnfermedadService,
    private masS: MascotasService,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe((data: Params) => {
      this.id = data['id']
      this.edicion = data['id'] != null
      this.init()
    })

    this.form = this.formBuilder.group({
      codigo: [''],
      en: ['', Validators.required],
      ma: ['', Validators.required],
    })

    this.enfS.list().subscribe(data => {
      this.listaEnfermedad = data
    })

    this.masS.list().subscribe(data => {
      this.listaMascota = data
    })

  }
  cancelar() {
    this.router.navigate(['mascotaenfermedad']);
  }

  aceptar() {
    if (this.form.valid) {
      this.mascotaenfermedad.idMascotaEnfermedad = this.form.value.codigo
      this.mascotaenfermedad.mascota.idMascota = this.form.value.ma
      this.mascotaenfermedad.enfermedad.idEnfermedad = this.form.value.en
      if (this.edicion) {
        this.mefS.update(this.mascotaenfermedad).subscribe(data => {
          this.mefS.list().subscribe(data => {
            this.mefS.setList(data)
          })
        })
      } else {
        this.mefS.insert(this.mascotaenfermedad).subscribe(() => {
          this.mefS.list().subscribe(data => {
            this.mefS.setList(data)
          })
        })
      }
      //Redirigir desde app.route.ts
      this.router.navigate(['mascotaenfermedad'])
    }
  }

  init() {
    if (this.edicion) {
      this.mefS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMascotaEnfermedad),
          en: new FormControl(data.enfermedad.idEnfermedad),
          ma: new FormControl(data.mascota.idMascota)
        })
      })
    }
  }
}
