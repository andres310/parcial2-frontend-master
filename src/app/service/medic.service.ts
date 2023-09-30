import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Medic } from '../model/medic';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicService  extends GenericService<Medic>{  //herea de GenericServices

  private medicChange = new Subject<Medic[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/medics`
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

  setMedicChange(list: Medic[]){
    this.medicChange.next(list);
   }

   getMedicChange(){
    //para que alguien lo utilice
    return this.medicChange.asObservable();
  }

}
