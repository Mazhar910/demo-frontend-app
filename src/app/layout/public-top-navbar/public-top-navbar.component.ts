import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthenticationService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-public-top-navbar',
  templateUrl: './public-top-navbar.component.html',
  styleUrls: ['./public-top-navbar.component.scss']
})
export class PublicTopNavbarComponent implements OnInit {

  appName = environment.appName;
  isLoggedIn : boolean = false;
  loggedInUser : any;
  loggedInUserRole:any;
  selectedLocation : any;

  constructor(
    private router: Router , 
    private authenticationService: AuthenticationService,
    private notifier : NotifierService
    ) { }

  ngOnInit() {
    if(this.authenticationService.isAuthenticated()){
      this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')); 
      this.loggedInUser =  JSON.parse(localStorage.getItem('loggedInUser'));
      this.selectedLocation = this.authenticationService.decodeSelectedLocation();
      this.loggedInUserRole = this.authenticationService.decodeRole();
    }
  }

  editProfile(id: any): void {
    this.router.navigate(["/profile-form",id]);
  }

  logout(){
    this.authenticationService.logout();
    this.authenticationService.logout();
    this.isLoggedIn = false;
    this.loggedInUser = null;
    this.loggedInUserRole = null;
    this.selectedLocation = null;
    this.notifier.notify('success','Logged out'); 
  }

  toggleNav() {
    let menuWidth = document.getElementById("myNav").style.width;
    if( menuWidth == "0%" || menuWidth == ""){
      document.getElementById("myNav").style.width = "75%";  
    } else {
      document.getElementById("myNav").style.width = "0%";  
    }
  }
}
