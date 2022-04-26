import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { User } from "../_models/user.model";
import { Builder } from 'protractor';

@Injectable({
  providedIn: "root"
})
export class UserService {
  endpoint = environment.APIEndpoint;

  constructor(private http: HttpClient) { }


  checkAPIStatus() {
    return this.http.get<any>(this.endpoint);
  }
  getUsers(roleName: any, userId) {
    return this.http.get<any>(this.endpoint + "/users/" + roleName + "/" + userId);
  }
  getUsersByLocationId(locationId: any) {
    return this.http.get<any>(this.endpoint + "/users/" + locationId);
  }
  getUsersByAccountType(accountType) {
    return this.http.get<any>(this.endpoint + "/users-by-account-type/" + accountType);
  }
  getMembers(roleName: any, userId) {
    return this.http.get<any>(this.endpoint + "/members/" + roleName + "/" + userId);
  }
  getUserById(id: any) {
    return this.http.get<any>(this.endpoint + "/user/" + id);
  }
  getUserByUuid(uuid: any) {
    return this.http.get<any>(this.endpoint + "/user/uuid/" + uuid);
  }
  createUser(user: any) {
    return this.http.post(this.endpoint + "/user", user);
  }
  updateUser(user: any) {
    return this.http.put<any>(this.endpoint + "/user/" + user.id, user);
  }
  deleteUser(user: any) {
    return this.http.delete<any>(this.endpoint + "/user/" + user.id);
  }
  checkPhone(phone: any) {
    return this.http.get<any>(this.endpoint + "/check-phone/" + phone);
  }
  checkEmail(email: any) {
    return this.http.get<any>(this.endpoint + "/check-email/" + email);
  }
  checkPhoneOrEmail(phone: any) {
    return this.http.get<any>(this.endpoint + "/check-phone-or-email/" + phone);
  }
  updateProfile(user: any) {
    return this.http.put<any>(this.endpoint + "/profile/" + user.id, user);
  }
  changePassword(user: any) {
    return this.http.put<any>(this.endpoint + "/change-password/" + user.id, user);
  }
  isTokenExpired(token: any) {
    return this.http.get<any>(this.endpoint + "/is-token-expired/" + token);
  }
  updateState(user: any) {
    return this.http.put<any>(this.endpoint + "/user/state/" + user.id, user);
  }
  updateStatus(user: any) {
    return this.http.put<any>(this.endpoint + "/user/status/" + user.id, user);
  }
}