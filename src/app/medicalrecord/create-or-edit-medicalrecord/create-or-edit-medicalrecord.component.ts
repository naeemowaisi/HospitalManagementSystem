import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MedicalRecord } from 'src/app/model';
import { MedicalrecordService } from '../medicalrecord.service';

@Component({
  selector: 'app-create-or-edit-medicalrecord',
  templateUrl: './create-or-edit-medicalrecord.component.html',
  styleUrls: ['./create-or-edit-medicalrecord.component.css']
})
export class CreateOrEditMedicalrecordComponent implements OnInit {
  @Output() onClose : EventEmitter<boolean> = new EventEmitter();
  medicalrecord= new MedicalRecord();
  medicalRecordId !: number;
  constructor(
    public bsModalRef : BsModalRef,
    private medicalrecordService : MedicalrecordService
  ){}
  ngOnInit(): void {
    if(this.medicalRecordId){
      this.medicalrecordService.getMedicalRecordById(this.medicalRecordId).subscribe(result=>{
        this.medicalrecord = result;
      })
    }
  }
  save():void{
    if(this.medicalrecord.medicalRecordId==undefined){
      this.medicalrecord.medicalRecordId=0;
      this.medicalrecordService.createMedicalRecord(this.medicalrecord).subscribe(()=>{
        this.bsModalRef.hide();
        this.onClose.emit(true)
      },
      error =>{
        console.error('Error saving person:', error);
        this.bsModalRef.hide();
        this.onClose.emit(false);
      }
    );
    }
    else{
      this.medicalrecordService.updateMedicalRecord(this.medicalrecord).subscribe(()=>{
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

}
