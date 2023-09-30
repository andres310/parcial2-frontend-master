import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css']
})
export class ExamEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute, //Recuperando la informacion de la URL  ACTIVA EN ESE MOMENTOS
    //navegar entre componenteestes
    private router: Router,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      //aqui va el nombre que le asiga en el html por ejemplo formControlName="idExam"
      'idExam' : new FormControl(0), //lo inicializamos con un valor 0
      'name' : new FormControl('', [Validators.required, Validators.minLength(3)]),
      'description' : new FormControl('', [Validators.required, Validators.minLength(3)]),

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

      this.examService.findById(this.id).subscribe(data => { //le paso el id y me subscribo con la data
        this.form = new FormGroup({
          'idExam' : new FormControl(data.idExam),
          'name' : new FormControl(data.name, [Validators.required, Validators.minLength(3)]),
          'description' : new FormControl(data.description, [Validators.required, Validators.minLength(3)]),

        });
      });
    }
  }

  get f() {
    return this.form.controls;  // para obtener los nombres de mis formularios
  }

  operate(){

  //generamos una instancia y decimos este paciente tiene un id exam que lo vamos a recupar del formulario
    let exam = new Exam();
    exam.idExam = this.form.value['idExam']; //este idExam viene del html
    exam.name = this.form.value['name'];
    exam.description = this.form.value['description'];


    //form es el nombre del formulario en el html
    if(this.form.invalid){return;}

    if(this.isEdit){
      //UPDATE
      //PRACTICA COMUN  despues de actualizar djar el parentsis en blanco y luego una acccion hacer y al subscribimer obtienes una nueva data y
      //utilizamos la variable reactiva .. y ofrece un metodo next que espera un valor
      // ANTERIOR -->   this.examService.update(exam).subscribe(); //le ponemos subscribe para enterarnos del resultado
      this.examService.update(exam).subscribe(() => {
        this.examService.findAll().subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!');
        });
      });

    }else{
      //INSERT
      //this.examService.save(exam).subscribe();
      //Practica ideal utilizamos un pipe cuandome devuelve obsarbale y este permite
      //operar con operadores reactivos antes de la subscripcion
      //Switchmap recibe la data anterior, primero guardamos y luego mostramos cuando estamos
      //seguros aplico la subscripcion
      this.examService.save(exam).pipe(switchMap( ()=>{
        return this.examService.findAll();
      })).subscribe(data => {
        this.examService.setExamChange(data)
        this.examService.setMessageChange('CREATED!');
      });

    }
//despues de insertar o actualizar yo puedo navegar hacia el padre
    this.router.navigate(['pages/exam'])
  }
}
