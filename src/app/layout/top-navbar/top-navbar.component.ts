import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { AuthenticationService } from "../../_services";
import { interval, Observable } from 'rxjs'
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";


@Component({
  selector: "app-top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"]
})
export class TopNavbarComponent {

  appName = environment.appName;
  loggedInUser: any;
  loggedInUserRole: any;
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifier: NotifierService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
  ) {
    if (this.authenticationService.isAuthenticated()) {
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      this.loggedInUser = this.authenticationService.decodeUser();
      this.loggedInUserRole = this.authenticationService.decodeRole();
    }
  }


  editProfile(id: any): void {
    this.router.navigate(["/profile-form", id]);
  }

  changePassword(id: any): void {
    this.router.navigate(["/change-password-form", id]);
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.loggedInUserRole = null;
    this.notifier.notify('success', 'Logged out');
  }

}
