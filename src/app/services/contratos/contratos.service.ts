import { Injectable } from '@angular/core';
import { Contrato } from '../../model/contrato.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  constructor(private http: HttpClient) {}

  agregarContrato(contrato: Contrato) {
    return this.http.post(`${environment.baseUrl}/contrato`, contrato);
  }

  actualizarContrato(contrato: Contrato) {
    return this.http.put(`${environment.baseUrl}/contrato`, contrato);
  }

  listarTemas() {
    return this.http.get<Contrato[]>(`${environment.baseUrl}/contrato`);
  }

  public listarContratosPorUsuario(id: number) {
    return this.http.get<Contrato[]>(
      `${environment.baseUrl}/contrato/listar/${id}`
    );
  }

  public listarContratosPorUsuarioServicio(id: number) {
    return this.http.get<Contrato[]>(`${environment.baseUrl}/contrato/servicio/${id}`);
  }

  eliminarContrato(id: number) {
    return this.http.delete(`${environment.baseUrl}/contrato/${id}`);
  }

  getId(id: number) {
    return this.http.get(`${environment.baseUrl}/contrato/${id}`);
  }
}
