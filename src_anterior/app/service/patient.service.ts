import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //esta forma no se recomienda ya que si cambia ... la url hay que cambiar en todo
  /*
  private url: string = " http://localhost:8080/patients";
  private url: string = environment.HOST+'/patients';
*/
  private url: string = `${environment.HOSTMEDIA}/patients`;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.url); //operado riamante y el retorno es un arreglo de pacientes PATIENT[]
  }

}

