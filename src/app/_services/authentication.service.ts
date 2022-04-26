import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { RoleService } from "./role.service";
import { Constants } from "src/constants/constants";
import { Role } from "../_models";
import { NotifierService } from "angular-notifier";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  decodeSubscription(): any {
    throw new Error('Method not implemented.');
  }
  decodePackage(): any {
    throw new Error('Method not implemented.');
  }
  endpoint = environment.APIEndpoint;
  isLoggedIn : boolean = localStorage.getItem('isLoggedIn') != null ? JSON.parse(localStorage.getItem('isLoggedIn')) : false ;
  roleService: RoleService;
  constructor(private http: HttpClient, private router: Router, private notifier : NotifierService) { }

  clear(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('loggedInUser') != null && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return false;
  }

  decode(): any {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  }

  decodeUser(): any {
    return JSON.parse(localStorage.getItem('loggedInUser')).user;
  }

  decodeSelectedLocation(): any {
    return JSON.parse(localStorage.getItem('selectedLocation') != null ? localStorage.getItem('selectedLocation') : JSON.stringify({id:0}) );
  }

  decodeRole(): any {
    return JSON.parse(localStorage.getItem('loggedInUser')).user.role.name;
  }

  decodeRoleObject(): Role {
    return JSON.parse(localStorage.getItem('loggedInUser')).user.role;
  }

  decodeDefaultRoute(): any {
    return JSON.parse(localStorage.getItem('loggedInUser')).user.role.defaultRoute;
  }

  isListRoute(allowed_route, index, array) {
    return (allowed_route.includes('list'));
  }

  login(phone: string, password: string): Observable<HttpResponse<any>> {
    let user = { phone: phone, password: password };
    return this.http.post<any>(this.endpoint + "/login", user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: "response"
    });
  }

  register(user: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.endpoint + "/register", user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: "response"
    });
  }

  logout(): void {
    this.clear();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
  getYearList() {
    let years: any = [];
    for (let i = new Date().getFullYear(); i >= 2000; i--) {
      years.push(i);
    }
    return years;
  }
}
