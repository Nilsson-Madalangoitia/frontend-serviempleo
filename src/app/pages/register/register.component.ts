import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../../services/registerService/register.service";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  public user = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    celular: '',
    ocupacion: '',
  };

  tipo: any[] = ['Estudiante', 'Mentor'];

  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
    });
  }

  register() {
    this.user.username = this.form.value['username'];
    this.user.password = this.form.value['password'];
    this.user.nombre = this.form.value['nombre'];
    this.user.apellido = this.form.value['apellido'];

    if (this.user.username == '' || this.user.username == null) {
      alert('El nombre de usuario es requerido');
      return;
    }
    this.registerService.añadirUsuario(this.user).subscribe(
      (res) => {
        console.log('Registrado!');
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
