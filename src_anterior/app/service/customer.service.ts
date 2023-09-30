import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url: string = `${environment.HOST}/customers`;
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Customer[]>(this.url);
  }


}
