import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Medic } from 'src/app/model/medic';
import { MedicService } from 'src/app/service/medic.service';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  //No son atributos del json eso esta en e row.idMedic
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cmp', 'actions'];
  dataSource: MatTableDataSource<Medic>;

  //Paginador
  @ViewChild(MatPaginator) paginador: MatPaginator;

  //Para ordenar los campos
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private snackBar: MatSnackBar,
    private medicService: MedicService,
    //Etiqueta para abrir un dialogo
    private dialog: MatDialog

    ) { }

  ngOnInit(): void {

    this.medicService.getMedicChange().subscribe( data => {    //Quiero entenerrm del contenido
      //this.dataSource = new MatTableDataSource(data);  //repoblamos con los datos de la variable anterior
      this.createTable(data);
    });

    this.medicService.getMedicChange().subscribe( data => {    //Quiero entenerrm del contenido
      console.log(data);
    });

    this.medicService.getMedicChange().subscribe( data => {    //Quiero entenerrm del contenido
      console.log("hola");
    });

    //PARA DARME CUENTA desde el padre abrir el mensaje del hijo
    this.medicService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', {duration: 2000,  verticalPosition:'top', horizontalPosition:'right'});
    });

    this.medicService.findAll().subscribe(data => {
      //this.dataSource = new MatTableDataSource(data); lo quietamos porque lo vamos a usar en createTable
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();

  }

  delete(idMedic: number){
    this.medicService.delete(idMedic).pipe(switchMap(()=>{
     return this.medicService.findAll();
    }))
    .subscribe(data => {
      this.medicService.setMedicChange(data);
      this.medicService.setMessageChange('DELETED!');
    });
  }

//Metodo del paginador
//Recibe un arreglo tipo medic
createTable(medics: Medic[]){
  this.dataSource = new MatTableDataSource(medics);
  this.dataSource.paginator = this.paginador;  //este  this.paginador capturar a taves del paginador viewchild
  this.dataSource.sort = this.sort;



}

//openDialog(medic: Medic){  para editar pero no funciona para nuervo `
//Cambpos obligatorios primero, opcionales despues por posicion
  openDialog( medic?: Medic){   //para NUEVO Y PARA EDITAR es opcionacil ? no estoy oglbiado
    this.dialog.open(MedicDialogComponent, {
    width: '250px',
    data: medic
  });
}

}
