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
import { InsertareditarComponent as InsertareditarRolComponent } from './components/rol/insertareditarrol/insertareditarrol.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InseratareditarusuarioComponent } from './components/usuario/inseratareditarusuario/inseratareditarusuario.component';
import { GeolocalizacionComponent } from './components/geolocalizacion/geolocalizacion.component';
import { InsertareditgeolocalizacionComponent } from './components/geolocalizacion/insertareditgeolocalizacion/insertareditgeolocalizacion.component';
import { InsertareditarmascotaComponent } from './components/mascota/insertareditarmascota/insertareditarmascota.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { PaseoComponent } from './components/paseo/paseo.component';
import { InserteditpaseoComponent } from './components/paseo/inserteditpaseo/inserteditpaseo.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { InserteditsolicitudComponent } from './components/solicitud/inserteditsolicitud/inserteditsolicitud.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InserteditcontratoComponent } from './components/contrato/inserteditcontrato/inserteditcontrato.component';
import { MenuComponent } from './components/menu/menu.component';
import { MascotaenfermedadComponent } from './components/mascotaenfermedad/mascotaenfermedad.component';
import { InserteditmascenfermComponent } from './components/mascotaenfermedad/inserteditmascenferm/inserteditmascenferm.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Reportemascotaedadmayor10Component } from './components/reportes/reportemascotaedadmayor10/reportemascotaedadmayor10.component';
import { HomeComponent } from './components/home/home.component';
import { ReportebuscarmascotaconEnfermedadComponent } from './components/reportes/reportebuscarmascotacon-enfermedad/reportebuscarmascotacon-enfermedad.component';
import { ReportecantidadrolusuariosComponent } from './components/reportes/reportecantidadrolusuarios/reportecantidadrolusuarios.component';
import { ServicioComponent } from './components/home/servicio/servicio.component';
import { ReportetamaniomascotaComponent } from './components/reportes/reportetamaniomascota/reportetamaniomascota.component';
import { ReporterazasmascotasComponent } from './components/reportes/reporterazasmascotas/reporterazasmascotas.component';
import { LoginComponent } from './components/login/login.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { RecomendacionesComponent } from './components/recomendaciones/recomendaciones.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
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
        ], canActivate: [seguridadGuard],
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
        ], canActivate: [seguridadGuard],
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
        ], canActivate: [seguridadGuard],
    },

    {
        path: 'metodosdepagos',
        component: MetodopagoComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarMetodoPagoComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditarMetodoPagoComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'roles',
        component: RolComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarRolComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditarRolComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'usuarios',
        component: UsuarioComponent,
        children: [
            {
                path: 'nuevo', component: InseratareditarusuarioComponent
            },
            {
                path: 'ediciones/:id', component: InseratareditarusuarioComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'geolocalizacion', component: GeolocalizacionComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditgeolocalizacionComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditgeolocalizacionComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'mascota', component: MascotaComponent,
        children: [
            {
                path: 'nuevo', component: InsertareditarmascotaComponent
            },
            {
                path: 'ediciones/:id', component: InsertareditarmascotaComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'paseo',
        component: PaseoComponent,
        children: [
            {
                path: 'nuevo', component: InserteditpaseoComponent
            },
            {
                path: 'ediciones/:id', component: InserteditpaseoComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'solicitud',
        component: SolicitudComponent,
        children: [
            {
                path: 'nuevo', component: InserteditsolicitudComponent
            },
            {
                path: 'ediciones/:id', component: InserteditsolicitudComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'contrato',
        component: ContratoComponent,
        children: [
            {
                path: 'nuevo', component: InserteditcontratoComponent
            },
            {
                path: 'ediciones/:id', component: InserteditcontratoComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'mascotaenfermedad',
        component: MascotaenfermedadComponent,
        children: [
            {
                path: 'nuevo', component: InserteditmascenfermComponent
            },
            {
                path: 'ediciones/:id', component: InserteditmascenfermComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'menu',
        component: MenuComponent,
        children: [], canActivate: [seguridadGuard],
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {
                path: 'servicio', component: ServicioComponent
            }
        ], canActivate: [seguridadGuard],
    },
    {
        path: 'reports',
        component: ReportesComponent,
        children: [
            {
                path: 'mascotaconedad10', component: Reportemascotaedadmayor10Component
            },
            {
                path: 'listarCantidadDeUsuariosRegistrados', component: ReportecantidadrolusuariosComponent
            },
            {
                path: 'buscarmascotaPorEnfermedad', component: ReportebuscarmascotaconEnfermedadComponent

            },
            {
                path: 'tamaniomascota', component: ReportetamaniomascotaComponent
            },
            {
                path: 'razamascota', component: ReporterazasmascotasComponent
            }
        ]
    },
    {
        path: 'recomendaciones',
        component: RecomendacionesComponent,
        canActivate: [seguridadGuard],
    }
];
