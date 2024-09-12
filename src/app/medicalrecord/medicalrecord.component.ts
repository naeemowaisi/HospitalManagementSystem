import { Component, OnInit } from '@angular/core';
import { MedicalrecordService } from './medicalrecord.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MedicalRecord } from '../model';
import { CreateOrEditMedicalrecordComponent } from './create-or-edit-medicalrecord/create-or-edit-medicalrecord.component';

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
    this.medicalrecordService.deleteMedicalRecord(id).subscribe(()=>{
      alert("Deleted Successfully");
      this.getMedicalRecordData();
    })
  }
}
   