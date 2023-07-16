import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../../../services/loginService/login.service';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { Servicio } from '../../../model/servicio.model';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css'],
})
export class EditarServicioComponent implements OnInit {
  private id: number;
  public servicio: Servicio;

  public titulo: string = '';
  public costo: number;
  public descripcion: string = '';

  constructor(
    private service: ServiciosService,
    private router: Router,
    private location: Location,
    public login: LoginService,
    public activeRoute: ActivatedRoute
  ) {
    this.activeRoute.paramMap.subscribe((paramMap) => {
      this.id = Number(paramMap.get('id'));
      this.service.getId(this.id).subscribe((data: any) => {
        this.servicio = data?.body;
        this.titulo = data?.body.titulo;
        this.costo = data?.body.costo;
        this.descripcion = data?.body.descripcion;
      });
    });
  }

  ngOnInit(): void {}

  update() {
    this.servicio.titulo = this.titulo;
    this.servicio.costo = this.costo;
    this.servicio.descripcion = this.descripcion;
    this.service.actualizarServicio(this.servicio).subscribe(() => {
      this.router.navigate(['/servicio']);
    });
  }

  back(): void {
    this.location.back();
  }

}
