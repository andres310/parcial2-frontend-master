import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Exam } from '../model/exam';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends GenericService<Exam> {

  private examChange = new Subject<Exam[]>;
  private messageChange = new Subject<string>;

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/exams`
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

  setExamChange(list: Exam[]){
    this.examChange.next(list);
   }

   getExamChange(){
    //para que alguien lo utilice
    return this.examChange.asObservable();
  }
}
