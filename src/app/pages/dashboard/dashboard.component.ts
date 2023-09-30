import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Eleccion } from 'src/app/model/eleccion';
import { EleccionServiceService } from 'src/app/service/eleccion-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  displayedColumns: string[] = ['candidato', 'votos', 'porcentaje'];
  dataSource: MatTableDataSource<Eleccion>;

  constructor(private _eleccionService: EleccionServiceService) {}

  ngOnInit() {
    this.initGet();
  }

  initGet() {
    this._eleccionService.findAll().subscribe(data => {
      this.createTable(data);
    })
  }

  createTable(elecciones: Eleccion[]) {
    this.dataSource = new MatTableDataSource(elecciones);
    //this.dataSource.paginator = this.paginator;
  }
}
