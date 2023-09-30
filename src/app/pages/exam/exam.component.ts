import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Exam } from 'src/app/model/exam';
import { ExamService } from 'src/app/service/exam.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description',  'actions'];
  dataSource: MatTableDataSource<Exam>;

  //Paginador
  @ViewChild(MatPaginator) paginador: MatPaginator;

  //Para ordenar los campos
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private examService: ExamService) { }

  ngOnInit(): void {

    this.examService.getExamChange().subscribe( data => {    //Quiero entenerrm del contenido
      //this.dataSource = new MatTableDataSource(data);  //repoblamos con los datos de la variable anterior
      this.createTable(data);
    });

    //PARA DARME CUENTA desde el padre abrir el mensaje del hijo
    this.examService.getMessageChange().subscribe(data => {
      this.snackBar.open(data, 'INFO', {duration: 2000,  verticalPosition:'top', horizontalPosition:'right'});
    });

    this.examService.findAll().subscribe(data => {
      //this.dataSource = new MatTableDataSource(data); lo quietamos porque lo vamos a usar en createTable
      this.createTable(data);
    });
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();

  }

  delete(idExam: number){
    this.examService.delete(idExam).pipe(switchMap(()=>{
     return this.examService.findAll();
    }))
    .subscribe(data => {
      this.examService.setExamChange(data);
      this.examService.setMessageChange('DELETED!');
    });
  }

//Metodo del paginador
//Recibe un arreglo tipo exam
createTable(exams: Exam[]){
  this.dataSource = new MatTableDataSource(exams);
  this.dataSource.paginator = this.paginador;  //este  this.paginador capturar a taves del paginador viewchild
  this.dataSource.sort = this.sort;
}


}
