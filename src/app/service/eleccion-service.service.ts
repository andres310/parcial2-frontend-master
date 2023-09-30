import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Eleccion } from '../model/eleccion';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EleccionServiceService extends GenericService<Eleccion> {

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/api/Elecciones/CantidadVotos`);
   }
}
