import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpResponse } from "@angular/common/http";
import { first } from "rxjs/operators";

import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from "../../_services";
import { NotifierService } from "angular-notifier";
import { Location } from '@angular/common';
import { NgxSpinner } from "ngx-spinner/lib/ngx-spinner.enum";
import { NgxSpinnerService } from "ngx-spinner";

declare var $;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = "hold-transition skin-red layout-top-nav fixed";
    this.loginForm = this.formBuilder.group({
      phone: ["", Validators.required],
      password: ["", Validators.required],
      /* recaptchaReactive: [null, Validators.required] */
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }
  get fields() {
    return this.loginForm.controls;
  }

  login() {
    this.spinner.show();
    this.authenticationService
      .login(this.fields.phone.value, this.fields.password.value)
      .subscribe((response: HttpResponse<any>) => {
        this.spinner.hide();
        if (response.body.status != null && response.body.status == "SUCCESS") {
          localStorage.setItem("loggedInUser", JSON.stringify(response.body));
          this.authenticationService.isLoggedIn = true;
          localStorage.setItem("isLoggedIn", "true");
          this.notifierService.notify('success', "Logged In Successfully");
          this.router.navigate(['/product-list'])
        } else {
          this.notifierService.notify('error', response.body.message);
          return;
        }
      });
  }
  ngOnDestroy(): void {
    document.body.className = '';
  }
}
