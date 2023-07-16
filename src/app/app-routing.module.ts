import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import { IsLoggedInGuard } from './guards/isLoggedIn/is-logged-in.guard';
import {HomeComponent} from './pages/home/home.component';
import { ListarServicioComponent } from './pages/servicios/listar-servicio/listar-servicio.component';
import { EditarServicioComponent } from './pages/servicios/editar-servicio/editar-servicio.component';
import { AgregarServicioComponent } from './pages/servicios/agregar-servicio/agregar-servicio.component';
import { ListarContratoComponent } from './pages/contratos/listar-contrato/listar-contrato.component';
import { AgregarContratoComponent } from './pages/contratos/agregar-contrato/agregar-contrato.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'servicio',
    component: ListarServicioComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'servicio/agregar',
    component: AgregarServicioComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'servicio/:id/edit',
    component: EditarServicioComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'contrato',
    component: ListarContratoComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'home/:id/contrato',
    component: AgregarContratoComponent,
    pathMatch: 'full',
    canActivate: [IsLoggedInGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
