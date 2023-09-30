import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

   //Columnas a mostar con arreglo de string
   displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'actions'];
  //Definir un Datasourse y quitamos el arreglo
  dataSource: MatTableDataSource<Patient>;
 //patients: Patient[]; //Arreglo



  //Quiero la instancia de PatientService
  constructor(private patientService: PatientService) { }

  ngOnInit(): void {

    // a veces presenta el error si pasamos el mouse por findall devuele un observable de tipo OBJECT (object a arreglo tipo de datos incompatibles)
    //nos vamos al findall

    //Porque hoy lo vamos a expresar diferente
    //this.patientService.findAll().subscribe(data => this.patients = data);

    this.patientService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });


  }
  applyFilter(e: any){

  }

}
