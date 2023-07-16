import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import { RegisterComponent } from './pages/register/register.component';
import {AuthInterceptor} from "./services/auth.interceptor";

import { authInterceptorProviders } from './services/auth.interceptor';

import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule,
} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AgregarServicioComponent } from './pages/servicios/agregar-servicio/agregar-servicio.component';
import { EditarServicioComponent } from './pages/servicios/editar-servicio/editar-servicio.component';
import { ListarServicioComponent } from './pages/servicios/listar-servicio/listar-servicio.component';
import { AgregarContratoComponent } from './pages/contratos/agregar-contrato/agregar-contrato.component';
import { ListarContratoComponent } from './pages/contratos/listar-contrato/listar-contrato.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    AgregarServicioComponent,
    EditarServicioComponent,
    ListarServicioComponent,
    AgregarContratoComponent,
    ListarContratoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatGridListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
