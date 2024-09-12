import { Component, Inject, Injector, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { Payment } from '../model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditPaymentComponent } from './create-or-edit-payment/create-or-edit-payment.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
   payments!: Payment[];
   patientName!: string; 
   date!: Date; 
   paymentMethod!: string; 
   amount!: number; 
   notes!: string;

   constructor(public paymentService : PaymentService,private modalService : BsModalService){}

   ngOnInit(): void {
     this.getPaymentsData();
   }

   getPaymentsData(){
    var patientName = this.patientName == undefined ? "": this.patientName;
    var date = this.date ? this.date.toISOString() : "";
    var paymentMethod = this.paymentMethod == undefined ? "": this.paymentMethod
    var amount = this.amount == undefined ? 0: this.amount
    var notes = this.notes == undefined ? "": this.notes

    this.paymentService.getPayments(patientName,date,paymentMethod,amount,notes).subscribe(result =>{
      this.payments = result;   
   });
   }
   createPayment(id?:number): void{
    let modalRef: BsModalRef;

    modalRef=this.modalService.show(
      CreateOrEditPaymentComponent,{
        class: 'modal-lg',
        initialState: {
          paymentId: id
        },
      }
    );
    modalRef.content.onClose.subscribe((result:boolean)=>{
      if(result==true){
        this.getPaymentsData();
      }
    });
   }
   deletePayment(id:number){debugger
    this.paymentService.deletePayment(id).subscribe(()=>{
      alert("Deleted Successfully")
      this.getPaymentsData();
    });
   }
}
