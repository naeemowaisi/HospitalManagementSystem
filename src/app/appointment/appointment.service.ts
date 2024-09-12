import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment, DoctorDropdown, MedicalRecordDropdown, PatientDetail, PatientDropdown, PaymentDropdown } from '../model';
import { CreateOrEditAppointmentComponent } from './create-or-edit-appointment/create-or-edit-appointment.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = "https://localhost:7272";
  constructor(private http : HttpClient) { }

  getAppointment(patientName:string,doctorSpecialization:string,dateTime:string,appointmentStatus:string,diagnosisRecord:string,paymentAmount:number) : Observable<Appointment[]>{
    return this.http.get<Appointment[]>(this.apiUrl+`/api/Appointment/GetAppointment?patientName=${patientName}&doctorSpecialization=${doctorSpecialization}&dateTime=${dateTime}&appointmentStatus=${appointmentStatus}&diagnosisRecord=${diagnosisRecord}&paymentAmount=${paymentAmount}`);
  }
  createAppointment(appointment : Appointment): Observable<any>{
    return this.http.post(this.apiUrl+"/api/Appointment/CreateAppointment",appointment);
  }
  updateAppointment(appointment : Appointment) : Observable<any>{
    return this.http.put(this.apiUrl+"/api/Appointment/UpdateAppointment",appointment);
  } 
  getAppointmentById(id : number) : Observable<Appointment>{
    return this.http.get<Appointment>(this.apiUrl+"/api/Appointment/GetAppointmentById?id="+id);
  }
  getPatientDetailById(id : number) : Observable<PatientDetail>{debugger
    return this.http.get<PatientDetail>(this.apiUrl+"/api/Appointment/GetPatientDetailsById?id="+id);
  }
  deleteAppointment(id : number) : Observable<any>{
    return this.http.delete(this.apiUrl+"/api/Appointment/DeleteAppointment?Id="+id);
  }
  getPatientForDropdown() : Observable<PatientDropdown[]>{
    return this.http.get<PatientDropdown[]>(this.apiUrl+"/api/Appointment/GetPatientForDropdown");
  }
  getDoctorForDropdown() : Observable<DoctorDropdown[]>{
    return this.http.get<DoctorDropdown[]>(this.apiUrl+"/api/Appointment/GetDoctorForDropdown");
  }
  getMedicalRecordForDropdown() : Observable<MedicalRecordDropdown[]>{
    return this.http.get<MedicalRecordDropdown[]>(this.apiUrl+"/api/Appointment/GetMedicalRecordForDropdown");
  }
  getPaymentForDropdown() : Observable<PaymentDropdown[]>{
    return this.http.get<PaymentDropdown[]>(this.apiUrl+"/api/Appointment/GetPaymentForDropdown");
  }
}
