import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { User, Role } from "src/app/_models";
import {
  UserService,
  RoleService,
  AuthenticationService
} from "../../_services";
import { first } from "rxjs/operators";
import { NotifierService } from "angular-notifier";
import { Constants } from "src/constants/constants";
import { PasswordValidation } from 'src/app/_validators/password-validator';

declare var $;
@Component({
  selector: "app-change-password-form",
  templateUrl: "./change-password-form.component.html",
  styleUrls: ["./change-password-form.component.scss"]
})
export class ChangePasswordFormComponent implements OnInit {
  user: any;
  changePasswordForm: FormGroup;
  private sub: any;
  private userId: any;

  loggedInUserRole: any; selectedLocation: any;
  
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notifierService: NotifierService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private authenticationService: AuthenticationService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      id: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params["id"];
    });
    if (this.userId) {
      this.userService.getUserByUuid(this.userId).subscribe(data => {
        //console.log(data);
        this.changePasswordForm.controls["id"].setValue(data.id);
      });
    }
    this.loggedInUserRole = authenticationService.decodeRole(); this.selectedLocation = authenticationService.decodeSelectedLocation();
    
    
  }

  ngOnInit() {
    window.dispatchEvent(new Event("resize"));
    document.body.className = "hold-transition skin-red layout-top-nav fixed";
  }

  get fields() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    if (this.changePasswordForm.controls["id"].value != "") {
      this.userService
        .changePassword(this.changePasswordForm.value)
        .pipe(first())
        .subscribe(data => {
          this.router.navigate([
            "/change-password-form",
            this.changePasswordForm.controls["id"].value
          ]);
          this.notifierService.notify(
            "success",
            "Password has been updated successfully."
          );
        });
    }
  }

  ngOnDestroy(): void {
    document.body.className = "";
    this.sub.unsubscribe();
  }

}
