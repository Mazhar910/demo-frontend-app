import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";

import { Route, Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService, RoleService, UserService, } from "../../_services";
import { Constants } from "src/constants/constants";
import { NgxSpinnerService } from "ngx-spinner";
import { User } from 'src/app/_models';
import { NotifierService } from 'angular-notifier';
import { environment } from 'src/environments/environment';
import { PasswordValidation } from 'src/app/_validators/password-validator';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  routesList: String[];
  usefulRoutesList: String[];
  routeSet = new Set<String>();
  host = environment.host;
  emailUsed: boolean = false;
  phoneUsed: boolean = false;
  invalidPhone: boolean = false;
  usernameUsed: boolean = false;
  subscriptionList: any = [];
  inquiryForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private roleService: RoleService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService,
    private userService: UserService,
    private changeReference: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = "hold-transition skin-red layout-top-nav fixed";
    //console.log(this.routesList);
    this.registerForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: [""],
      agreed: ["", Validators.requiredTrue],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  get fields() {
    return this.registerForm.controls;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isEmailUsed(email) {
    if (this.validateEmail(email)) {
      this.userService.checkEmail(email).subscribe(data => {
        this.emailUsed = data;
        if (data) {
          this.registerForm.controls['email'].setErrors({ 'incorrect': true });
        } else {
          this.registerForm.controls['email'].setErrors(null);
        }
        this.changeReference.detectChanges();
      });
    } else {
      this.emailUsed = false;
      this.changeReference.detectChanges();
    }
  }

  isValidPhone(phone) {
    if (phone.substring(0, 1) != 0) {
      this.invalidPhone = true;
      this.changeReference.detectChanges();
    } else {
      this.invalidPhone = false;
      this.changeReference.detectChanges();
    }
  }
  isPhoneUsed(phone) {
    if (phone.length == 11) {
      this.userService.checkPhone(phone).subscribe(data => {
        this.phoneUsed = data;
        if (data) {
          this.registerForm.controls['phone'].setErrors({ 'incorrect': true });
        } else {
          this.registerForm.controls['phone'].setErrors(null);
        }
        this.changeReference.detectChanges();
      });
    } else {
      this.phoneUsed = false;
      this.changeReference.detectChanges();
    }
  }


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    let user = this.registerForm.getRawValue();
    user.select_label = user.fullName + " : " + user.phone + " : " + user.email;
    this.spinner.show();
    this.authenticationService.register(user).subscribe((response: HttpResponse<any>) => {
      this.spinner.hide();
      this.registerForm.reset();
      if (response.body.status != null && response.body.status == "SUCCESS") {
        this.notifierService.notify('success', 'Registered');
        this.router.navigate(['/login']);

      } else {
        //TODO : ERROR HANDELING
        this.notifierService.notify('error', response.body.message);
        return;
      }
    });
  }



  ngOnDestroy(): void {
    document.body.className = '';
  }

}


