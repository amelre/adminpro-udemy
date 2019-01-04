import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales () {
    const url = URL_SERVICIOS + '/hospital';

    return this.http.get( url);
  }

  obtenerHospital( id: string) {
    const url = URL_SERVICIOS + '/hospital/'+ id;

    return this.http.get(url)
      .map( (resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
      .map( resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      });

  }

  crearHospital( nombre: string) {
    // const hospital: Hospital = new Hospital(nombre);

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' +  this._usuarioService.token;

    return this.http.post(url, {nombre})
      .map( (resp: any) => {

        swal('Hospital creado', resp.hospital.nombre, 'success');
        return resp.hospital;
      });
  }

  buscarHospital(termino: string) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this.http.get( url)
    .map( (resp: any) => resp.hospital);
  }

  actualizarHospital ( hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' +  this._usuarioService.token;

    return this.http.put( url, hospital )
      .map((resp: any) => {
        swal( 'Hospital actualizado', hospital.nombre, 'success');
        return resp.hospital;
      });

  }

}
