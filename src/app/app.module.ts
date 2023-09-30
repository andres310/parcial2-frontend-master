import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicDialogComponent } from './pages/medic/medic-dialog/medic-dialog.component';
import { ExamComponent } from './pages/exam/exam.component';
import { ExamEditComponent } from './pages/exam/exam-edit/exam-edit.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { SpecialtyEditComponent } from './pages/specialty/specialty-edit/specialty-edit.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultAutocompleteComponent } from './pages/consult-autocomplete/consult-autocomplete.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export function tokenGetter() {
  //return sessionStorage.getItem(environment.TOKEN_NAME);
  return localStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    MedicComponent,
    PatientEditComponent,
    MedicDialogComponent,
    ExamComponent,
    ExamEditComponent,
    SpecialtyComponent,
    SpecialtyEditComponent,
    ConsultComponent,
    LoginComponent,
    ConsultAutocompleteComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule, //para uso de forms
    FormsModule, //para el two way binding
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,  //la funcion(arriba) donde recupera la libreia y ese token enviarlo
        allowedDomains: ["localhost:8585"],  //validar dnnde enviariamos el token
        disallowedRoutes: ["http://localhost:8585/login/forget"], //donde no vamos a enviar el token
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
