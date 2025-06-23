import { Routes } from '@angular/router';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { InsertareditarComponent } from './components/calificacion/insertareditar/insertareditar.component';
import { ClimaComponent } from './components/clima/clima.component';
import { InsertareditarclimaComponent } from './components/clima/insertareditar/insertareditarclima.component';
import { EnfermedadComponent } from './components/enfermedad/enfermedad.component';
import { InsertareditarenfermComponent } from './components/enfermedad/insertareditarenferm/insertareditarenferm.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { InsertareditgeolocalizacionComponent } from './components/geolocalizacion/insertareditgeolocalizacion/insertareditgeolocalizacion.component';

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
                path: 'ediciones/:id', component: InsertareditarenfermComponent
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
    }
];
