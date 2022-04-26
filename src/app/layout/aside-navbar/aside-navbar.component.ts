import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/user.model";
import { AuthenticationService } from "src/app/_services";

@Component({
  selector: "app-aside-navbar",
  templateUrl: "./aside-navbar.component.html",
  styleUrls: ["./aside-navbar.component.scss"]
})
export class AsideNavbarComponent implements OnInit {
  loggedInUser: any;
  allowed_list_routes: any;
  defaultRoute: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loggedInUser = this.authenticationService.decodeUser();
    this.defaultRoute = this.authenticationService.decodeDefaultRoute();
  }
}
