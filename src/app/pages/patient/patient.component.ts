import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  dataSource: MatTableDataSource<Patient>;

  //Paginador
  @ViewChild(MatPaginator) paginador: MatPaginator;

  //Para ordenar los campos
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private patientService: PatientService) { }

  ngOnInit(): void {

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      //this.dataSource = new MatTableDataSource(data);  //repoblamos con los datos de la variable anterior
      this.createTable(data);
    });

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      console.log(data);
    });

    this.patientService.patientChange.subscribe( data => {    //Quiero entenerrm del contenido
      console.log("hola");
    });

    //PARA DARME CUENTA desde el padre abrir el mensaje del hijo
    this.patientService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', {duration: 2000,  verticalPosition:'top', horizontalPosition:'right'});
    });

    this.patientService.findAll().subscribe(data => {
      //this.dataSource = new MatTableDataSource(data); lo quietamos porque lo vamos a usar en createTable
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();

  }

  delete(idPatient: number){
    this.patientService.delete(idPatient).pipe(switchMap(()=>{
     return this.patientService.findAll();
    }))
    .subscribe(data => {
      this.patientService.patientChange.next(data);
      this.patientService.setMessageChange('DELETED!');
    });
  }

//Metodo del paginador
//Recibe un arreglo tipo patient
createTable(patients: Patient[]){
  this.dataSource = new MatTableDataSource(patients);
  this.dataSource.paginator = this.paginador;  //este  this.paginador capturar a taves del paginador viewchild
  this.dataSource.sort = this.sort;
}

}
