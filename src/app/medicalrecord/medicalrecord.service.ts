import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRecord } from '../model';

@Injectable({
  providedIn: 'root'
})
export class MedicalrecordService {

  private apiUrl = "https://localhost:7272";
  constructor(private http : HttpClient) { }

  getMedicalRecords(description:string,diagnosis:string,notes:string):Observable<MedicalRecord[]>{
   return this.http.get<MedicalRecord[]>(this.apiUrl+`/api/MedicalRecord/GetMedicalRecords?description=${description}&diagnosis=${diagnosis}&notes=${notes}`);
  }
  createMedicalRecord(medicalrecord:MedicalRecord):Observable<any>{
    return this.http.post(this.apiUrl+"/api/MedicalRecord/CreateMedicalRecord",medicalrecord);
  }
  updateMedicalRecord(medicalrecord : MedicalRecord) : Observable<any>{
    return this.http.put(this.apiUrl+"/api/MedicalRecord/UpdateMedicalRecord",medicalrecord);
  }
  getMedicalRecordById(id : number) : Observable<MedicalRecord>{
    return this.http.get<MedicalRecord>(this.apiUrl+"/api/MedicalRecord/GetMedicalRecordById?id="+id);
  }
  deleteMedicalRecord(id : number) : Observable<any>{
    return this.http.delete(this.apiUrl+"/api/MedicalRecord/DeleteMedicalRecord?Id="+id);
  }
}
