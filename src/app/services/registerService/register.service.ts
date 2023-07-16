import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  public añadirUsuario(user:any){
    return this.http.post(`${environment.baseUrl}/usuarios/`,user);
  }
}
