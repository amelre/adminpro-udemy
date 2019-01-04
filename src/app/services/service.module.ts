import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  HospitalService,
  LoginGuardGuard,
  SubirArchivoService,
  MedicoService
} from './service.index';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
