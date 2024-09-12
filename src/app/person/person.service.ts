import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private apiUrl = "https://localhost:7272";

  constructor(private http: HttpClient) { }

  getPersons(name:string,dateOfBirth:string, gender:number, phoneNumber:string, email:string, address:string  ): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl+`/api/Person/GetPerson?name=${name}&dateOfBirth=${dateOfBirth}&gender=${gender}&phoneNumber=${phoneNumber}&email=${email}&address=${address}`);
  }
  createPerson(person:Person):Observable<any> {
    return this.http.post(this.apiUrl+"/api/Person/CreatePerson",person);
  }

  updatePerson(person:Person):Observable<any> {
    return this.http.put(this.apiUrl+"/api/Person/UpdatePerson",person);
  }

  getPersonById(id:number): Observable<Person> {
    return this.http.get<Person>(this.apiUrl+"/api/Person/GetPersonById?id="+id);
  }

  deletePerson(id:number): Observable<any> {
    return this.http.delete(this.apiUrl+"/api/Person/DeletePerson?Id="+id,{
      responseType: 'text'  // Set responseType to 'text' to handle string responses
    });
  }
}




