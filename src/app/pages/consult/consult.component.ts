import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Consult } from 'src/app/model/consult';
import { ConsultDetail } from 'src/app/model/consultDetail';
import { Exam } from 'src/app/model/exam';
import { Medic } from 'src/app/model/medic';
import { Patient } from 'src/app/model/patient';
import { Specialty } from 'src/app/model/specialty';
import { ExamService } from 'src/app/service/exam.service';
import { MedicService } from 'src/app/service/medic.service';
import { PatientService } from 'src/app/service/patient.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import * as moment from 'moment';
import { ConsultListExamDTO } from 'src/app/dto/ConsultListExamDTO';
import { ConsultService } from 'src/app/service/consult.service';


@Component({

  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {


  patients$: Observable<Patient[]>;
  medics$: Observable<Medic[]>;
  specialties$: Observable<Specialty[]>;
  exams$: Observable<Exam[]>;


  patients: Patient[];  //variable patients que se llama desde el HTML
  idPatientSelected: number;

  //Para medicos con observable
  //medics$: Observable<Medic[]>;
  idMedicSelected: number;

  //Para examenes con observable
  //exams$: Observable<Exam[]>;
  idExamSelected: number;

  //Para specialties con observable
  //specialties$: Observable<Specialty[]>;
  idSpecialtySelected: number;

  //Fecha maxima actual del sistema
  maxDate: Date = new Date();
  minDate: Date = new Date();
  dateSelected: Date;
  /*
  Para un observable seria
  patients$: Observable<Patient[]>;

  y dentro del metodo getPatients seria

  this.patients$ = this.patientService.findAll();
  */
  diagnosis: string;
  treatment: string;
  details: ConsultDetail[]=[]; //Inicializamos de una vez con un arreglo en Blanco
  examsSelected: Exam [] = [];

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private examService: ExamService,
    private specialtyService: SpecialtyService,
    private consultService: ConsultService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.getPatients();
    this.getMedics();
    this.getExams();
    this.getSpecialties();
  }

  getPatients(){
    this.patientService.findAll().subscribe(
      data =>this.patients=data  // manda los datos al arreglo definido anteriormente
    );
  }
  getMedics(){
    this.medics$ = this.medicService.findAll();
  }

  getExams(){
    this.exams$ = this.examService.findAll();
  }

  getSpecialties(){
    this.specialties$ = this.specialtyService.findAll();
  }

  addDetail(){
    /*NECESEITO generar una instancia de detalles  */


  //Creamos una nueva instancia
  let det = new ConsultDetail();
  //este detalle tiene un dianosist y treatment
  det.diagnosis = this.diagnosis;
  det.treatment = this.treatment;

  this.details.push(det); //aqui le mandamos el detalle al details
  }
  removeDetail(index: number){
    this.details.splice(index, 1);

  }

  addExam(){

    if(this.idExamSelected > 0){
      this.examService.findById(this.idExamSelected).subscribe(data => this.examsSelected.push(data));


    }else {
      this.snackBar.open('Please select an exam', 'INFO', {duration: 2000});
    }

  }

  save(){
    let patient = new Patient();
    patient.idPatient = this.idPatientSelected;

    let medic = new Medic();
    medic.idMedic = this.idMedicSelected;

    let specialty = new Specialty();
    specialty.idSpecialty = this.idSpecialtySelected

    let consult = new Consult();
    consult.patient = patient;
    consult.medic = medic;
    consult.specialty = specialty;
    consult.numConsult = "C1";
    consult.details = this.details;
    consult.consultDate = moment(this.dateSelected).format('YYYY-MM-DDTHH:mm:ss');
    console.log(consult.consultDate);

    let dto = new ConsultListExamDTO();
    dto.consult = consult;
    dto.lstExam = this.examsSelected;

    this.consultService.saveTransactional(dto).subscribe(() => {
      this.snackBar.open('SUCCESSFULL', 'INFO', { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);

    });


  }
  cleanControls() {
    this.idExamSelected = 0;
    this.idPatientSelected = 0;
    this.idSpecialtySelected = 0;
    this.idMedicSelected = 0;
    this.dateSelected = new Date();
    this.diagnosis = null;
    this.treatment = null;
    this.details = [];
    this.examsSelected = [];
  }

}
