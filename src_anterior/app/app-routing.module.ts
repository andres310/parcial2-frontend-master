import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicComponent } from './pages/medic/medic.component';
import { PatientComponent } from './pages/patient/patient.component';
import { CustomerComponent } from './pages/customer/customer.component';

const routes: Routes = [
{path: 'pages/medic', component: MedicComponent},
{path: 'pages/patient', component: PatientComponent},
{path: 'pages/customer', component: CustomerComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

