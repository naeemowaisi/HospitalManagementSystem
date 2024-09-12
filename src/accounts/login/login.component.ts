import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../app/user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Token } from '@angular/compiler';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email:string = ''
  password:string = ''
  isSubmitting:boolean = false
  validationErrors:Array<any> = []
  public responseMessage: string = '';

 
  constructor(public userAuthService: UserAuthService, private router: Router) {}
 
  ngOnInit(): void {debugger
    if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
      this.router.navigateByUrl('/person')
    }
  }
 
  loginAction() {
    this.isSubmitting = true;
    let payload = {
      email: this.email,
      password: this.password,
    };
  
    this.userAuthService.login(payload).subscribe(
      (response: string) => {
        // Assuming the response is a string that could either be a token or an error message
        try {
          const data = JSON.parse(response); // Try to parse the response if it's JSON
          if (data.token) {
            localStorage.setItem('token', data.token);
            this.router.navigateByUrl('/person');
            Swal.fire({
              title: 'sucess!',
              text: 'Login',
              icon: 'success',
            });
          } else if (data.message) {
            Swal.fire({
              title: 'Failed!',
              text: data.message,
              icon: 'error',
              timer:9
            });
          }
        } catch (e) {
          // If the response is plain text and not JSON, handle it here
          if (response.includes('token')) {
            localStorage.setItem('token', response);
            this.router.navigateByUrl('/person');
          } else {
            Swal.fire({
              title: 'Failed!',
              text: response,
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        }
        this.isSubmitting = false;
      }
    );
  }
  
  
}
