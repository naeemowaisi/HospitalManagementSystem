import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PatientDropdown, Payment } from 'src/app/model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-create-or-edit-payment',
  templateUrl: './create-or-edit-payment.component.html',
  styleUrls: ['./create-or-edit-payment.component.css']
})
export class CreateOrEditPaymentComponent implements OnInit{
  @Output() onClose : EventEmitter <boolean> = new EventEmitter();
  payment = new Payment();

  patientList !:PatientDropdown[];
  paymentId !: number;
  constructor(
    public bsModalRef : BsModalRef,
    private paymentService : PaymentService
  ){}
  ngOnInit(): void {
    this.paymentService.getPymentById(this.paymentId).subscribe(result=>{
      this.payment = result;
    });
    this.getPatientForDropdownData();
  }

save():void{debugger
  this.payment.patientName = "";
  if(this.payment.paymentId == undefined){
    this.payment.paymentId=0;
    this.paymentService.createPayment(this.payment).subscribe(()=>{
      this.bsModalRef.hide();
      this.onClose.emit(true);
    },
    error =>{
      console.error('Error saving payment',error);
      this.bsModalRef.hide();
      this.onClose.emit(false);
    }
  );
  }
  else{
    this.paymentService.updatePayment(this.payment).subscribe(()=>{
      this.bsModalRef.hide();
      this.onClose.emit(true);
    },
    error =>{
      console.error('Error saving payment',error);
      this.bsModalRef.hide();
      this.onClose.emit(false);
    }
  );
  }
}


getPatientForDropdownData()  {debugger
    this.paymentService.getPatientForDropdown().subscribe(result => {
      this.patientList = result;
    });
  }

}
