import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();



  constructor(private http:HttpClient) {


  }

  //Llama al metodo SpringBoot para generar el token
  public generateToken(loginData:any){
    return this.http.post(`${environment.baseUrl}/generate-token`,loginData)
  }

  //Iniciamos la sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token',token);
  }


  //Verificar si esta logeado
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else {
      return true;
    }
  }

  //Cerramos la sesión y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }


  //Obteniendo el token
  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));

  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  public getCurrentUser(){
    return this.http.get(`${environment.baseUrl}/actual-usuario`);
  }
}
