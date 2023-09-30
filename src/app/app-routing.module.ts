import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { PatientComponent } from './pages/patient/patient.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { ExamComponent } from './pages/exam/exam.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'pages/patient', component: PatientComponent, children: [
    { path: 'new', component: PatientEditComponent }, //hijo para un nuevo
    { path: 'edit/:id', component: PatientEditComponent } //hijo
  ] },
  { path: 'pages/exam', component: ExamComponent, children: [
    { path: 'new', component: ExamEditComponent }, //hijo para un nuevo
    { path: 'edit/:id', component: ExamEditComponent } //hijo
  ] },
  { path: 'pages/specialty', component: SpecialtyComponent, children: [
    { path: 'new', component: SpecialtyEditComponent }, //hijo para un nuevo
    { path: 'edit/:id', component: SpecialtyEditComponent } //hijo
  ] },
  { path: 'pages/medic', component: MedicComponent }
  ,
  { path: 'pages/consult', component: ConsultComponent },
  { path: 'pages/consult-autocomplete', component: ConsultAutocompleteComponent },
  {path: 'pages/dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
