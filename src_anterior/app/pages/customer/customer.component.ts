import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.findAll().subscribe(data => this.customer = data);
  }

}
