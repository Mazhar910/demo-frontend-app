import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "../_services/user.service";

@Injectable()
export class CustomEmailValidator {
  debouncer: any;

  constructor(public userService: UserService) {}

  isEmailAlreadyExists(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.userService.checkEmail(control.value).subscribe(
          res => {
              console.log(res);
            if (res.ok) {
              resolve(null);
            }
          },
          err => {
            resolve({ emailInUse: true });
          }
        );
      }, 1000);
    });
  }
}
