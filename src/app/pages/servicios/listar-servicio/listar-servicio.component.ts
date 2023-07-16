import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { ContratosService } from '../../../services/contratos/contratos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicio } from '../../../model/servicio.model';
import { Contrato } from '../../../model/contrato.model';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/loginService/login.service';

@Component({
  selector: 'app-listar-servicio',
  templateUrl: './listar-servicio.component.html',
  styleUrls: ['./listar-servicio.component.css'],
})
export class ListarServicioComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'titulo',
    'costo',
    'descripcion',
    'acciones',
  ];

  displayedColumns2: string[] = [
    'id',
    'nombre',
    'apellido',
    'telefono',
    'direccion',
    'mensaje',
    'acciones',
  ];

  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  @ViewChild(MatPaginator) _paginator2!: MatPaginator;
  @ViewChild(MatSort) _sort2!: MatSort;

  finalData: any;
  finalData2: any;
  form: FormGroup;
  form2: FormGroup;
  userActual: any = null;

  constructor(
    private service: ServiciosService,
    private contratoService: ContratosService,
    public login: LoginService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required, Validators.pattern('[0-9]')],
      titulo: ['', Validators.required],
      costo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.form2 = this.fb.group({
      id: ['', Validators.required, Validators.pattern('[0-9]')],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarServiciosDelUsuario();
    this.cargarContratosDelUsuario();
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro qué deseas eliminar el servicio?',
      text: 'La acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.service.eliminarServicio(id).subscribe(() => {
          this.cargarServiciosDelUsuario();
        });
        Swal.fire('Eliminado!', 'Eliminaste el servicio.', 'success').then(
          (okay) => {
            if (okay) {
              this.cargarServiciosDelUsuario();
            }
          }
        );
      }
    });
  }

  cargarServiciosDelUsuario() {
    this.userActual = this.login.getUser();
    this.service
      .listarServiciosPorUsuario(this.userActual.id)
      .subscribe((data: any) => {
        this.finalData = new MatTableDataSource(data['body']);
        this.finalData.paginator = this._paginator;
        this.finalData.sort = this._sort;
      });
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalData.filter = filterValue.trim().toLowerCase();
  }

  //contratos que recibe el usuario

  cargarContratosDelUsuario() {
    this.userActual = this.login.getUser();
    this.contratoService
      .listarContratosPorUsuarioServicio(this.userActual.id)
      .subscribe((data: any) => {
        this.finalData2 = new MatTableDataSource(data['body']);
        this.finalData2.paginator = this._paginator2;
        this.finalData2.sort = this._sort2;
      });
  }

  deleteContrato(id: number) {
    Swal.fire({
      title: '¿Estás seguro qué deseas eliminar el contrato?',
      text: 'La acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.contratoService.eliminarContrato(id).subscribe(() => {
          this.cargarContratosDelUsuario();
        });
        Swal.fire('Eliminado!', 'Eliminaste el contrato.', 'success').then(
          (okay) => {
            if (okay) {
              this.cargarContratosDelUsuario();
            }
          }
        );
      }
    });
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.finalData2.filter = filterValue.trim().toLowerCase();
  }
}
