import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/loginService/login.service';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { Servicio } from '../../model/servicio.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  lista: Servicio[];

  constructor(
    public login: LoginService,
    private service: ServiciosService
  ) {}

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios() {
    this.service.listarServicios().subscribe((data: any) => {
        this.lista = data?.body;
    });
  }

}
