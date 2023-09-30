import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';


@Component({
  selector: 'app-medic-dialog',
  templateUrl: './medic-dialog.component.html',
  styleUrls: ['./medic-dialog.component.css']
})
export class MedicDialogComponent implements OnInit {

//Variable medic de tipo Medic
   medic: Medic;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medic,
    private dialogRef: MatDialogRef<MedicDialogComponent>,
    //Realizamos la injeccion para poder usar el servicio generic
    private medicService: MedicService

  ) { }

  ngOnInit(): void {
    //this.medic = this.data;
    //console.log( his.data);
    this.medic = { ...this.data};

  }

  operate(){
    if(this.medic != null && this.medic.idMedic >0){
      //UPDATE
      this.medicService.update(this.medic).pipe(switchMap(()=>{
        return this.medicService.findAll();
      }))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('UPDATED!');
      });
    }else{
      //SAVE
      this.medicService.save(this.medic).pipe(switchMap(()=>{
        return this.medicService.findAll();
      }))
      .subscribe(data => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('CREATED!');
      });

    }
    this.close(); //Cerramos el dialogo

  }

  close(){
    this.dialogRef.close();
  }

}
