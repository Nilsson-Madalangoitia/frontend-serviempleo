import { Component, OnInit } from '@angular/core';
import {ContratosService} from '../../../services/contratos/contratos.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { LoginService } from '../../../services/loginService/login.service';
import {Contrato} from '../../../model/contrato.model';
import { Servicio } from '../../../model/servicio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-contrato',
  templateUrl: './agregar-contrato.component.html',
  styleUrls: ['./agregar-contrato.component.css'],
})
export class AgregarContratoComponent implements OnInit {
  private id: number;
  private iduserService: number;
  datos: Contrato = new Contrato();
  userActual: any = null;

  constructor(
    private service: ContratosService,
    private serviceS: ServiciosService,
    private router: Router,
    public activeRoute: ActivatedRoute,
    public login: LoginService,
    private location: Location
  ) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id'));
      this.serviceS.getId(this.id).subscribe((data: any) => {
        this.iduserService = data?.body.idusuario;
        this.datos.idusuario = this.iduserService;
        this.datos.servicio = data?.body.titulo;
        this.datos.costo = data?.body.costo;
      });
    });
  }

  ngOnInit(): void {
    this.userActual = this.login.getUser();
    this.datos.iduserc = this.userActual.id;
    this.datos.nombre = this.userActual.nombre;
    this.datos.apellido = this.userActual.apellido;
  }

  agregar() {
    
    if (this.datos.iduserc == this.datos.idusuario) {

      Swal.fire(
        'Error!',
        'No puedes contratarte a ti mismo',
        'warning'
      )

    }else{

      this.service.agregarContrato(this.datos).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error)
      );

    }
    
  }

  back(): void {
    this.location.back();
  }
}
