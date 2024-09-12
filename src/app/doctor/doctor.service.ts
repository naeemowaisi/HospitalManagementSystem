import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor, Person, PersonDropdown } from '../model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  private apiUrl = "https://localhost:7272";

  constructor(private http:HttpClient) { }

  getDoctors(personName:string,specialization:string):Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.apiUrl+`/api/Doctor/GetDoctors?personName=${personName}&specialization=${specialization}`);
  }
  createDoctor(doctor:Doctor):Observable<any> {
    return this.http.post(this.apiUrl+"/api/Doctor/CreateDoctor",doctor);
  }

  updateDoctor(doctor:Doctor):Observable<any> {
    return this.http.put(this.apiUrl+"/api/Doctor/UpdateDoctor",doctor);
  }

  getDoctorById(id:number): Observable<Doctor> {
    return this.http.get<Doctor>(this.apiUrl+"/api/Doctor/GetDoctorsById?Id="+id);
  } 

  deleteDoctor(id: number): Observable<string> {
    return this.http.delete(this.apiUrl + "/api/Doctor/DeleteDoctor?Id=" + id, {
      responseType: 'text'  // Set responseType to 'text' to handle string responses
    });
  }
  getPersonForDropdown():Observable<PersonDropdown[]>{
    return this.http.get<PersonDropdown[]>(this.apiUrl+"/api/Doctor/GetPersonForDropdown");
  }

}


