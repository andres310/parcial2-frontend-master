import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-specialty-edit',
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css']
})
export class SpecialtyEditComponent implements OnInit {

  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute, //Recuperando la informacion de la URL  ACTIVA EN ESE MOMENTOS
    //navegar entre componenteestes
    private router: Router,
    private specialtyService: SpecialtyService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      //aqui va el nombre que le asiga en el html por ejemplo formControlName="idSpecialty"
      'idSpecialty' : new FormControl(0), //lo inicializamos con un valor 0
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

      this.specialtyService.findById(this.id).subscribe(data => { //le paso el id y me subscribo con la data
        this.form = new FormGroup({
          'idSpecialty' : new FormControl(data.idSpecialty),
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

  //generamos una instancia y decimos este paciente tiene un id specialty que lo vamos a recupar del formulario
    let specialty = new Specialty();
    specialty.idSpecialty = this.form.value['idSpecialty']; //este idSpecialty viene del html
    specialty.name = this.form.value['name'];
    specialty.description = this.form.value['description'];


    //form es el nombre del formulario en el html
    if(this.form.invalid){return;}

    if(this.isEdit){
      //UPDATE
      //PRACTICA COMUN  despues de actualizar djar el parentsis en blanco y luego una acccion hacer y al subscribimer obtienes una nueva data y
      //utilizamos la variable reactiva .. y ofrece un metodo next que espera un valor
      // ANTERIOR -->   this.specialtyService.update(specialty).subscribe(); //le ponemos subscribe para enterarnos del resultado
      this.specialtyService.update(specialty).subscribe(() => {
        this.specialtyService.findAll().subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('UPDATED!');
        });
      });

    }else{
      //INSERT
      //this.specialtyService.save(specialty).subscribe();
      //Practica ideal utilizamos un pipe cuandome devuelve obsarbale y este permite
      //operar con operadores reactivos antes de la subscripcion
      //Switchmap recibe la data anterior, primero guardamos y luego mostramos cuando estamos
      //seguros aplico la subscripcion
      this.specialtyService.save(specialty).pipe(switchMap( ()=>{
        return this.specialtyService.findAll();
      })).subscribe(data => {
        this.specialtyService.setSpecialtyChange(data)
        this.specialtyService.setMessageChange('CREATED!');
      });

    }
//despues de insertar o actualizar yo puedo navegar hacia el padre
    this.router.navigate(['pages/specialty'])
  }
}
