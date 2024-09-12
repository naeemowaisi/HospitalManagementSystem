import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model';
import { AppointmentService } from './appointment.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditAppointmentComponent } from './create-or-edit-appointment/create-or-edit-appointment.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  appointments !: Appointment[];
  patientName!: string;
  doctorSpecialization!: string;
  dateTime!: Date;
  appointmentStatus!: string;
  diagnosisRecord!: string;
  paymentAmount!: number;

  constructor(public appointmentService: AppointmentService, private modalService: BsModalService) { }
  ngOnInit(): void {
    this.getAppointmentData();
  }
  getAppointmentData() {
    var patientName = this.patientName == undefined ? "": this.patientName;
    var doctorSpecialization = this.doctorSpecialization == undefined ? "": this.doctorSpecialization;
    var dateTime = this.dateTime ? this.dateTime.toISOString() : "";
    var appointmentStatus = this.appointmentStatus == undefined ? "": this.appointmentStatus;
    var diagnosisRecord = this.diagnosisRecord == undefined ? "": this.diagnosisRecord;
    var paymentAmount = this.paymentAmount == undefined ? 0: this.paymentAmount
    this.appointmentService.getAppointment(patientName,doctorSpecialization,dateTime,appointmentStatus,diagnosisRecord,paymentAmount).subscribe(result => {
      this.appointments = result;
    });
  }
  createAppointment(id?: number): void {
    debugger;
    let modalRef: BsModalRef;
    modalRef = this.modalService.show(
      CreateOrEditAppointmentComponent, {
      class: 'modal-lg',
      initialState: {
        appointmentId: id
      },
    }
    );
    modalRef.content.onClose.subscribe((result: boolean) => {
      if (result == true) {
        this.getAppointmentData();
      }
    });
  }
  deleteAppointment(id: number) {
    this.appointmentService.deleteAppointment(id).subscribe(() => {
      alert("Delete Successfully");
      this.getAppointmentData();
    })
  }
}
