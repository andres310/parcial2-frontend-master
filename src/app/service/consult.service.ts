import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConsultListExamDTO } from '../dto/ConsultListExamDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  private url: string = `${environment.HOST}/consults`;
  constructor(
    private http: HttpClient
  ) { }

  saveTransactional(dto: ConsultListExamDTO){
    return this.http.post(this.url, dto)
  }
}
