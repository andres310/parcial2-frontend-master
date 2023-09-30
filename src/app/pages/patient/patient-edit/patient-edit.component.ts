import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Patient } from 'src/app/model/patient';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute, //Recuperando la informacion de la URL  ACTIVA EN ESE MOMENTOS
    //navegar entre componenteestes
    private router: Router,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      //aqui va el nombre que le asiga en el html por ejemplo formControlName="idPatient"
      'idPatient' : new FormControl(0), //lo inicializamos con un valor 0
      'firstName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'dni' : new FormControl('', [Validators.required, Validators.maxLength(8)]),
      'address' : new FormControl(''),
      'phone' : new FormControl('', [Validators.required, Validators.minLength(9)]),
      'email' : new FormControl('', [Validators.required, Validators.email])
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];  //data que has recouperado y el parametro id si le ponemos :id ese si le ponemos :x aqui seria x
      this.isEdit = data['id'] != null; //si viene es una edicion si no es nuevo
      this.initForm();
    })

  }

  //inicializamos el formulario ese nombre uno lo eligen
  initForm(){
    if(this.isEdit){

      this.patientService.findById(this.id).subscribe(data => { //le paso el id y me subscribo con la data
        this.form = new FormGroup({
          'idPatient' : new FormControl(data.idPatient),
          'firstName' : new FormControl(data.firstName, [Validators.required, Validators.minLength(3)]),
          'lastName' : new FormControl(data.lastName, [Validators.required, Validators.minLength(3)]),
          'dni' : new FormControl(data.dni, [Validators.required, Validators.maxLength(8)]),
          'address' : new FormControl(data.address),
          'phone' : new FormControl(data.phone, [Validators.required, Validators.minLength(9)]),
          'email' : new FormControl(data.email, [Validators.required, Validators.email])
        });
      });
    }
  }

  get f() {
    return this.form.controls;  // para obtener los nombres de mis formularios
  }

  operate(){

  //generamos una instancia y decimos este paciente tiene un id patient que lo vamos a recupar del formulario
    let patient = new Patient();
    patient.idPatient = this.form.value['idPatient']; //este idPatient viene del html
    patient.firstName = this.form.value['firstName'];
    patient.lastName = this.form.value['lastName'];
    patient.dni = this.form.value['dni'];
    patient.address = this.form.value['address'];
    patient.phone = this.form.value['phone'];
    patient.email = this.form.value['email'];


    //form es el nombre del formulario en el html
    if(this.form.invalid){return;}

    if(this.isEdit){
      //UPDATE
      //PRACTICA COMUN  despues de actualizar djar el parentsis en blanco y luego una acccion hacer y al subscribimer obtienes una nueva data y
      //utilizamos la variable reactiva .. y ofrece un metodo next que espera un valor
      // ANTERIOR -->   this.patientService.update(patient).subscribe(); //le ponemos subscribe para enterarnos del resultado
      this.patientService.update(patient).subscribe(() => {
        this.patientService.findAll().subscribe(data => {
          this.patientService.patientChange.next(data);
          this.patientService.setMessageChange('UPDATED!');
        });
      });

    }else{
      //INSERT
      //this.patientService.save(patient).subscribe();
      //Practica ideal utilizamos un pipe cuandome devuelve obsarbale y este permite
      //operar con operadores reactivos antes de la subscripcion
      //Switchmap recibe la data anterior, primero guardamos y luego mostramos cuando estamos
      //seguros aplico la subscripcion
      this.patientService.save(patient).pipe(switchMap( ()=>{
        return this.patientService.findAll();
      })).subscribe(data => {
        this.patientService.patientChange.next(data)
        this.patientService.setMessageChange('CREATED!');
      });

    }
//despues de insertar o actualizar yo puedo navegar hacia el padre
    this.router.navigate(['pages/patient'])
  }
}
