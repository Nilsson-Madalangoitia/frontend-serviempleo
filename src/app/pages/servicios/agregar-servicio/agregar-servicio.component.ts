import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../../services/loginService/login.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { Servicio } from '../../../model/servicio.model';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.css'],
})
export class AgregarServicioComponent implements OnInit {
  form: FormGroup;
  userActual: any = null;

  constructor(
    private service: ServiciosService,
    private router: Router,
    public login: LoginService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl(),
      costo: new FormControl(),
      descripcion: new FormControl(),
    });
  }

  save() {
    this.userActual = this.login.getUser();
    let servicio = new Servicio();
    servicio.titulo = this.form.value['titulo'];
    servicio.costo = this.form.value['costo'];
    servicio.descripcion = this.form.value['descripcion'];
    servicio.idusuario = this.userActual.id;
    this.service.agregarServicio(servicio).subscribe(
      (res) => {
        this.router.navigate(['/servicio']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  back(): void {
    this.location.back();
  }

}
