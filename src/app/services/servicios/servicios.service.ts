import { Injectable } from '@angular/core';
import { Servicio } from '../../model/servicio.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  constructor(private http: HttpClient) {}

  agregarServicio(servicio: Servicio) {
    return this.http.post(`${environment.baseUrl}/servicio`, servicio);
  }

  actualizarServicio(servicio: Servicio) {
    return this.http.put(`${environment.baseUrl}/servicio`, servicio);
  }

  listarServicios() {
    return this.http.get<Servicio[]>(`${environment.baseUrl}/servicio`);
  }

  public listarServiciosPorUsuario(id: number) {
    return this.http.get<Servicio[]>(`${environment.baseUrl}/servicio/listar/${id}`);
  }

  eliminarServicio(id: number) {
    return this.http.delete(`${environment.baseUrl}/servicio/${id}`);
  }

  getId(id: number) {
    return this.http.get(`${environment.baseUrl}/servicio/${id}`);
  }
}
