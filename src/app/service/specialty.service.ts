import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Specialty } from '../model/specialty';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService  extends GenericService<Specialty>{

  private specialtyChange = new Subject<Specialty[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/specialties`
      );

   }

   //Getters y Setters

   setMessageChange(message: string){
    this.messageChange.next(message);
   }

   getMessageChange(){
    //para que alguien lo utilice
    return this.messageChange.asObservable();
  }

  setSpecialtyChange(list: Specialty[]){
    this.specialtyChange.next(list);
   }

   getSpecialtyChange(){
    //para que alguien lo utilice
    return this.specialtyChange.asObservable();
  }
}
