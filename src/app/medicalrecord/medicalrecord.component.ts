import { Component, OnInit } from '@angular/core';
import { MedicalrecordService } from './medicalrecord.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicalRecord } from '../model';
import { CreateOrEditMedicalrecordComponent } from './create-or-edit-medicalrecord/create-or-edit-medicalrecord.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicalrecord',
  templateUrl: './medicalrecord.component.html',
  styleUrls: ['./medicalrecord.component.css']
})
export class MedicalrecordComponent implements OnInit {
  medicalrecords !: MedicalRecord[];
  description!: string; 
  diagnosis!: string; 
  notes!: string;
  public responseMessage: string = '';
  constructor(public medicalrecordService : MedicalrecordService,private modalService : BsModalService ){}

  ngOnInit(): void {
    this.getMedicalRecordData();
  }
  getMedicalRecordData() {
    var description = this.description == undefined ? "": this.description;
    var diagnosis = this.diagnosis == undefined ? "": this.diagnosis;
    var notes = this.notes == undefined ? "": this.notes;

    this.medicalrecordService.getMedicalRecords(description,diagnosis,notes).subscribe(result =>{
      this.medicalrecords = result;
    });
  }
  createMedicalRecord(id? : number) : void{
    let modalRef : BsModalRef;

    modalRef = this.modalService.show(
      CreateOrEditMedicalrecordComponent,{
        class : 'modal-lg',
        initialState:{
          medicalRecordId : id
        },
      }
    );
    modalRef.content.onClose.subscribe((result: boolean) => {
      if (result === true) {
        this.getMedicalRecordData();
      }
    });
  }
  deleteMedicalRecord(id : number){
    this.medicalrecordService.deleteMedicalRecord(id).subscribe({
      next: (response: string) => {
        this.responseMessage = response;
        if(this.responseMessage!=""){
          Swal.fire({
            title: 'Failed!',
            html: `<div style="font-size: 60px;">🖕</div><p>${this.responseMessage}</p>`,
            showConfirmButton: true,
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
       
      this.getMedicalRecordData();
      }
    });
  }
}
   