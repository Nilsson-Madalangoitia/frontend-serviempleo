import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContratosService } from '../../../services/contratos/contratos.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contrato } from '../../../model/contrato.model';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/loginService/login.service';

@Component({
  selector: 'app-listar-contrato',
  templateUrl: './listar-contrato.component.html',
  styleUrls: ['./listar-contrato.component.css'],
})
export class ListarContratoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'servicio',
    'costo',
    'mensaje',
    'acciones',
  ];

  temas: Contrato[];
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  finalData: any;
  form: FormGroup;
  userActual: any = null;

  constructor(
    private contratoService: ContratosService,
    private router: Router,
    public login: LoginService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required, Validators.pattern('[0-9]')],
      servicio: ['', Validators.required],
      costo: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarContratosDelUsuario();
  }

  delete(id: number) {
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

  cargarContratosDelUsuario() {
    this.userActual = this.login.getUser();
    this.contratoService.listarContratosPorUsuario(this.userActual.id)
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

}
