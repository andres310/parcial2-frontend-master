import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient';
import { Subject} from 'rxjs';
import { GenericService } from './generic.service';


@Injectable({
  providedIn: 'root'
})
export class PatientService extends GenericService<Patient> {
  //Variable publica
   patientChange = new Subject<Patient[]>;  //en [] porque obtiene una lista de patients

  //Variable privada para notificar
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/patients`
      );

   }

/*
  private url: string = `${environment.HOST}/patients`;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.url);
  }

  findById(idPatient: number){
    return this.http.get<Patient>(`${this.url}/${idPatient}`)
  }

  //Registrar
  //Recibe un paciente y vamos a retornar una peticion de tipo post y le passamoe el patiente involucdrao
  save(patient: Patient){
    //return this.http.post<Patient>(this.url, patient); cuando quieres retornar
    return this.http.post(this.url, patient);
  }

  update(patient: Patient){
    return this.http.put(this.url, patient);
  }

  delete( idPatient: number){
    return this.http.delete(`${this.url}/${idPatient}`);
  }

  */
 ///Getter y setter para el message
 setMessageChange(message: string){
  this.messageChange.next(message);
 }

 getMessageChange(){
  //para que alguien lo utilice
  return this.messageChange.asObservable();
}

}
