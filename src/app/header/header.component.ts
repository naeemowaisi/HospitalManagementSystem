import { Component, OnInit, ɵProfilerEvent } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UserAuthService } from "../user-auth.service";

@Component({
    selector:'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit{
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
constructor(public userAuthService: UserAuthService, private router: Router) { }

logoutAction() { debugger
    this.userAuthService.logout();  // Call the logout method to remove the token
    this.router.navigateByUrl('/login');  // Redirect to the home page after logout
  }
}