import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiUrl = "https://localhost:7272";

  constructor(private http: HttpClient) { }
  
  login(data:any): Observable<any>{debugger
    let payload = {
      username: data.email,
      password: data.password
    }
    return this.http.post(this.apiUrl+ '/api/Account/login', payload, {
      responseType: 'text' // Set responseType to 'text' to handle string responses
    })
  }
  register(data:any): Observable<any>{debugger
    let payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    }
    return this.http.post(this.apiUrl+'/api/Account/register', payload)
  }
  logout(): void {
    localStorage.removeItem('token');  // Clear token from local storage
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // Check if the token is present
  }
}
