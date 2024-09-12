import { Component, Input, OnInit } from '@angular/core';
import { UserAuthService } from '../../app/user-auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  isSubmitting: boolean = false;
  validationErrors: any = [];
  @Input() text = 'Click me';

  constructor(public userAuthService: UserAuthService, private router: Router) {}

  ngOnInit(): void {debugger
    if (localStorage.getItem('token') != '' && localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/login');
    }
  }

  registerAction() {
    this.isSubmitting = true;
    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.userAuthService.register(payload).subscribe(data => {
          localStorage.setItem('token', data.token);
          Swal.fire({
            title: 'Registration Successful!',
            text: `Welcome, ${this.username}!`,
            icon: 'success',
            confirmButtonText: 'Continue'
          }).then(() => {debugger
            this.router.navigateByUrl('/login');
          });
        },
        (error) => {
          this.isSubmitting = false;
          this.validationErrors = error.errors || [];
          Swal.fire({
            title: 'Registration Failed',
            text: 'Please check your inputs and try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
  }
}
