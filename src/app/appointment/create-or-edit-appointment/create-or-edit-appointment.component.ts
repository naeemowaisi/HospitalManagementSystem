import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Appointment, DoctorDropdown, MedicalRecord, MedicalRecordDropdown, PatientDetail, PatientDropdown, Payment, PaymentDropdown } from 'src/app/model';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-create-or-edit-appointment',
  templateUrl: './create-or-edit-appointment.component.html',
  styleUrls: ['./create-or-edit-appointment.component.css']
})
export class CreateOrEditAppointmentComponent implements OnInit{
  @Output() onClose : EventEmitter<boolean> = new EventEmitter();

  appointment = new Appointment();
  patients = new PatientDetail();

  patientList !: PatientDropdown[];
  doctorList !: DoctorDropdown[];
  medicalrecordList !: MedicalRecordDropdown[];
  paymentList !: PaymentDropdown[];
  appointmentId !: number;

  constructor(
    public bsModalRef : BsModalRef,
    private appointmentService : AppointmentService
  ){}
  ngOnInit(): void {
  
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe(result=>{
      this.appointment = result;
    })
    this.getPatientForDropdownData();
    this.getDoctorForDropdownData();
    this.getMedicalRecordForDropdownData();
    this.getPaymentForDropdownData();
  }

  getPatientDetailByidData(event:any){debugger
    this.appointmentService.getPatientDetailById(event?.value).subscribe(data=>{
      this.patients = data;
      this.appointment.patientId = this.patients?.patientId
      this.appointment.doctorId = this.patients?.doctorId
      this.appointment.paymentId = this.patients?.paymentId
    });
  }
  save() : void{
    if(this.appointment.appointmentId==undefined){
      this.appointment.appointmentId=0;
      this.appointmentService.createAppointment(this.appointment).subscribe(()=>{
        this.bsModalRef.hide();
        this.onClose.emit(true);
      },
      error =>{
        console.error('Error saving person:', error);
        this.bsModalRef.hide();
        this.onClose.emit(false);
      }
    );
    }
    else{
      this.appointmentService.updateAppointment(this.appointment).subscribe(()=>{
        this.bsModalRef.hide();
        this.onClose.emit(true);
      },
      error =>{
        console.error('Error saving person:', error);
        this.bsModalRef.hide();
        this.onClose.emit(false);
      }
    )
    }
  }
  getPatientForDropdownData(){
    this.appointmentService.getPatientForDropdown().subscribe(result=>{
      this.patientList = result;
    });
  }
  getDoctorForDropdownData(){
    this.appointmentService.getDoctorForDropdown().subscribe(result=>{
      this.doctorList = result;
    });
  }
  getMedicalRecordForDropdownData(){
    this.appointmentService.getMedicalRecordForDropdown().subscribe(result=>{
      this.medicalrecordList = result;
    });
  }
  getPaymentForDropdownData(){
    this.appointmentService.getPaymentForDropdown().subscribe(result=>{
      this.paymentList = result;
    })
  }
}
