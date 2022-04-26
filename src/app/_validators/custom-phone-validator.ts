import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { UserService } from "../_services/user.service";

@Injectable()
export class CustomPhoneValidator {
  debouncer: any;

  constructor(public userService: UserService) {}

  isPhoneAlreadyExists(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.userService.checkPhone(control.value).subscribe(
          res => {
            if (res.ok) {
              resolve(null);
            }
          },
          err => {
            resolve({ phoneInUse: true });
          }
        );
      }, 1000);
    });
  }
}
