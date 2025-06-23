import { Routes } from '@angular/router';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { InsertareditarComponent } from './components/calificacion/insertareditar/insertareditar.component';
import { ClimaComponent } from './components/clima/clima.component';
import { InsertareditarclimaComponent } from './components/clima/insertareditar/insertareditarclima.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { InsertareditarenfermComponent } from './components/enfermedad/insertareditarenferm/insertareditarenferm.component';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { RolComponent } from './components/rol/rol.component';
import { InsertareditarMetodoPagoComponent } from './components/metodopago/insertareditarmetodoPago/insertareditarmetodoPago.component';
import { InsertareditarComponent as InsertareditarRolComponent } from  './components/rol/insertareditarrol/insertareditarrol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InseratareditarusuarioComponent } from './components/usuario/inseratareditarusuario/inseratareditarusuario.component';



import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { InsertareditgeolocalizacionComponent } from './components/geolocalizacion/insertareditgeolocalizacion/insertareditgeolocalizacion.component';
import { InsertareditarmascotaComponent } from './components/mascota/insertareditarmascota/insertareditarmascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';

export const routes: Routes = [
    {
        path: 'calificaciones',
        component: CalificacionComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditarComponent
            }
        ]
    },
    {
        path: 'climas',
        component: ClimaComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarclimaComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditarclimaComponent
            }
        ]
    },
    {
        path: 'enfermedades',
        component: EnfermedadComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarenfermComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarenfermComponent
            }
        ]
    },

    {
        path: 'metodosdepagos',
        component: MetodopagoComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarMetodoPagoComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarMetodoPagoComponent
            }
        ]
    },
    {
        path: 'roles',
        component: RolComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarRolComponent
            },
            {
                path:'ediciones/:id', component:InsertareditarRolComponent
            }
        ]
    },
    {
        path: 'usuarios',
        component: UsuarioComponent,
        children: [
            {
                path: 'nuevo', component: InseratareditarusuarioComponent
            },
            {
                path:'ediciones/:id', component:InseratareditarusuarioComponent
            }
        ]
    },
    {
        path:'geolocalizacion',component:GeolocalizacionComponent,
        children:[
            {
                path:'nuevo', component:InsertareditgeolocalizacionComponent
            }
        ]
    },
    {
        path: 'mascota',component:MascotaComponent,
        children:[
            {
                path: 'nuevo', component: InsertareditarmascotaComponent
            }
        ]
    }
];
