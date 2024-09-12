import { Component,Inject, Injector, OnInit } from '@angular/core';
import { DoctorService } from './doctor.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditDoctorComponent } from './create-or-edit-doctor/create-or-edit-doctor.component';
import { Doctor, PersonDropdown } from '../model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit{
  doctors!: Doctor[];
  personName!: string;
  specialization!: string;
  public responseMessage: string = '';


constructor(public doctorService : DoctorService,private modalService: BsModalService){}

  ngOnInit(): void {
    this.getDoctorsData();
}

  getDoctorsData(){
    var personName = this.personName == undefined ? "": this.personName
    var specialization = this.specialization == undefined ? "": this.specialization
  this.doctorService.getDoctors(personName,specialization).subscribe(result =>{
      this.doctors = result;
    });
}

createDoctor(id?: number): void {
  let modalRef: BsModalRef;

  modalRef = this.modalService.show(
    CreateOrEditDoctorComponent, {
    class: 'modal-lg',
    initialState: {
      doctorId: id
    },
  }
  );
  modalRef.content.onClose.subscribe((result: boolean) => {
    if (result === true) {
      this.getDoctorsData();
    }
  });
}
deleteDoctor(id: number) {debugger
  this.doctorService.deleteDoctor(id).subscribe({
    next: (response: string) => {
      this.responseMessage = response;
      if(this.responseMessage!=""){
        Swal.fire({
          title: 'Failed!',
          text: `${this.responseMessage}!`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        return;
      }
      Swal.fire({
        title: 'Success!',
        text: `Deleted Successfully`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
     
    this.getDoctorsData();
    }
  });
}
}