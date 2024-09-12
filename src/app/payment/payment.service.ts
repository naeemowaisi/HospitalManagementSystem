import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDropdown, Payment } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
 private apiUrl = "https://localhost:7272";
  constructor(private http : HttpClient) { }

  getPayments(patientName:string,date:string,paymentMethod:string,amount:number,notes:string) : Observable<Payment[]>{debugger
    return this.http.get<Payment[]>(this.apiUrl+`/api/Payment/GetPayment?patientName=${patientName}&date=${date}&paymentMethod=${paymentMethod}&amount=${amount}&notes=${notes}`);
  }
  createPayment(payment:Payment):Observable<any>{debugger
    return this.http.post(this.apiUrl+"/api/Payment/CreatePayment",payment)
  }
  updatePayment(payment:Payment):Observable<any>{
    return this.http.put(this.apiUrl+"/api/Payment/UpdatePayment",payment)
  }
  getPymentById(id:number):Observable<Payment>{
    return this.http.get<Payment>(this.apiUrl+"/api/Payment/GetPaymentById?Id="+id)
  }
  deletePayment(id:number):Observable<any>{debugger
    return this.http.delete(this.apiUrl+"/api/Payment/DeletePayment?id="+id, {
      responseType: 'text'  // Set responseType to 'text' to handle string responses
    })
  }
  getPatientForDropdown():Observable<PatientDropdown[]>{
    return this.http.get<PatientDropdown[]>(this.apiUrl+"/api/Payment/GetPatientForDropdown");
  }
}

