import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person/person.component';
import { HeaderComponent } from './header/header.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PaymentComponent } from './payment/payment.component';
import { MedicalrecordComponent } from './medicalrecord/medicalrecord.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegisterComponent } from '../accounts/register/register.component';
import { LoginComponent } from '../accounts/login/login.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'person', component: PersonComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'medicalrecord', component: MedicalrecordComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }