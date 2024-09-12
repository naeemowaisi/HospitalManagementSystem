import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PersonComponent } from './person/person.component';
import { AppRoutingModule } from './app-routing.module';
import { PersonService } from './person/person.service';
import { HttpClientModule } from '@angular/common/http';
import { DoctorComponent } from './doctor/doctor.component';
import { PaymentComponent } from './payment/payment.component';
import { CreateOrEditPersonComponent } from './person/create-or-edit-person/create-or-edit-person.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { DoctorService } from './doctor/doctor.service';
import { PaymentService } from './payment/payment.service';
import { CreateOrEditDoctorComponent } from './doctor/create-or-edit-doctor/create-or-edit-doctor.component';
import { CreateOrEditPaymentComponent } from './payment/create-or-edit-payment/create-or-edit-payment.component';
import { MedicalrecordComponent } from './medicalrecord/medicalrecord.component';
import { MedicalrecordService } from './medicalrecord/medicalrecord.service';
import { CreateOrEditMedicalrecordComponent } from './medicalrecord/create-or-edit-medicalrecord/create-or-edit-medicalrecord.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateOrEditAppointmentComponent } from './appointment/create-or-edit-appointment/create-or-edit-appointment.component';
import { AppointmentService } from './appointment/appointment.service';
import { LoginComponent } from '../accounts/login/login.component';
import { RegisterComponent } from '../accounts/register/register.component';
import { UserAuthService } from './user-auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonComponent,
    DoctorComponent,
    PaymentComponent,
    CreateOrEditPersonComponent,
    CreateOrEditDoctorComponent,
    CreateOrEditPaymentComponent,
    MedicalrecordComponent,
    CreateOrEditMedicalrecordComponent,
    AppointmentComponent,
    CreateOrEditAppointmentComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [PersonService, DoctorService, PaymentService,MedicalrecordService,AppointmentService,UserAuthService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
