import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Specialty } from 'src/app/model/specialty';
import { SpecialtyService } from 'src/app/service/specialty.service';

@Component({
  selector: 'app-specialty ',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description',  'actions'];
  dataSource: MatTableDataSource<Specialty>;


  //Paginador
  @ViewChild(MatPaginator) paginador: MatPaginator;

  //Para ordenar los campos
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,   //para validar si esta activa o no la ruta
    private specialtyService: SpecialtyService) { }


  ngOnInit(): void {

    this.specialtyService.getSpecialtyChange().subscribe( data => {    //Quiero entenerrm del contenido
      //this.dataSource = new MatTableDataSource(data);  //repoblamos con los datos de la variable anterior
      this.createTable(data);
    });

    //PARA DARME CUENTA desde el padre abrir el mensaje del hijo
    this.specialtyService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', {duration: 2000,  verticalPosition:'top', horizontalPosition:'right'});
    });

    this.specialtyService.findAll().subscribe(data => {
      //this.dataSource = new MatTableDataSource(data); lo quietamos porque lo vamos a usar en createTable
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();

  }

  delete(idSpecialty: number){
    this.specialtyService.delete(idSpecialty).pipe(switchMap(()=>{
     return this.specialtyService.findAll();
    }))
    .subscribe(data => {
      this.specialtyService.setSpecialtyChange(data);
      this.specialtyService.setMessageChange('DELETED!');
    });
  }

//Metodo del paginador
//Recibe un arreglo tipo specialty
createTable(specialtys: Specialty[]){
  this.dataSource = new MatTableDataSource(specialtys);
  this.dataSource.paginator = this.paginador;  //este  this.paginador capturar a taves del paginador viewchild
  this.dataSource.sort = this.sort;
}

checkChildren(){
  return this.route.children.length !=0;
}


}
