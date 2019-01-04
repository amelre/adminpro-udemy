import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( rep => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService.cargarHospitales()
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });

  }

  buscarHospital( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Estas seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe( borrado => {
            this.cargarHospitales();
          });
      }
    });

  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.motrarModal('hospitales', id);
  }

  agregarHospital() {
    swal({
      text: 'Escribe el nombre del Nuevo Hospital',
      content: 'input',
      icon: 'info',
      button: {
        text: 'Agregar',
        closeModal: false,
      },
    })
    .then(agregar => {

      if (agregar) {
        console.log(agregar);
        this._hospitalService.crearHospital(agregar).subscribe(
          hospital => {
            swal.stopLoading();
            swal.close();
            this.cargarHospitales();
          });
      } else {
        swal.stopLoading();
        swal.close();
      }


    });
}

}
