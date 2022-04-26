import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
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
import { PasswordValidation } from "src/app/_validators/password-validator";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

declare var $;
@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"]
})
export class UserFormComponent implements OnInit {
  user: any;
  userForm: FormGroup;
  private sub: any;
  userId: any;
  rolesList: any[];
  locationList: any = [];
  loggedInUserRole: any; selectedLocation: any;
  loggedInUser: any;
  avatar: any;
  emailUsed: boolean = false;
  phoneUsed: boolean = false;
  invalidPhone: boolean = false;
  usernameUsed: boolean = false;
  cover: any;

  constructor(
    private changeReference: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private notifierService: NotifierService
  ) {
    this.userForm = this.formBuilder.group(new User(), {
      validator: PasswordValidation.MatchPassword
    });
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params["id"];
    });
    if (this.userId) {
      this.userService.getUserByUuid(this.userId).subscribe(data => {
        console.log(data);
        if (this.loggedInUserRole != 'Admin') {
          this.userForm.controls["phone"].disable();
        }
        this.userForm.controls["id"].setValue(data.id);
        this.userForm.controls["uuid"].setValue(data.uuid);
        this.userForm.controls["fullName"].setValue(data.fullName);
        this.userForm.controls["email"].setValue(data.email);
        this.userForm.controls["phone"].setValue(data.phone);
        this.userForm.controls["password"].setValue(data.password);
        this.userForm.controls["confirmPassword"].setValue(data.password);
        this.userForm.controls["agreed"].setValue(data.agreed);
        this.userForm.controls["avatar"].setValue(data.avatar);
        this.avatar = data.avatar;
        this.userForm.controls["state"].setValue(data.state);
        this.userForm.controls["status"].setValue(data.status);
        this.userForm.controls["createdDate"].setValue(new Date(data.createdDate));
        this.userForm.controls["role"].setValue(data.role);
        console.log(data.locations);
        this.userForm.controls["locations"].setValue(data.locations);
        this.userForm.controls["selectLabel"].setValue(
          data.fullName +
          " : " +
          data.phone +
          " : " +
          data.email
        );
        this.cover = data.cover;
      });
    }
    this.loggedInUserRole = authenticationService.decodeRole(); this.selectedLocation = authenticationService.decodeSelectedLocation();

    this.loggedInUser = this.authenticationService.decodeUser();
    this.getRoles();
  }

  ngOnInit() {
    window.dispatchEvent(new Event("resize"));
    document.body.className = "hold-transition skin-red layout-top-nav fixed";
    this.userForm.controls["agreed"].setValue(true);

  }

  get fields() {
    return this.userForm.controls;
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
          this.userForm.controls["email"].setErrors({ incorrect: true });
        } else {
          this.userForm.controls["email"].setErrors(null);
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
          this.userForm.controls["phone"].setErrors({ incorrect: true });
        } else {
          this.userForm.controls["phone"].setErrors(null);
        }
        this.changeReference.detectChanges();
      });
    } else {
      this.phoneUsed = false;
      this.changeReference.detectChanges();
    }
  }

  onSubmit() {
    let locations: any = [];
    this.userForm.controls["locations"].value.forEach((locationObject: any) => {
      let location: any = { "id": locationObject.id, "uuid": locationObject.uuid, "name" : locationObject.name , "selectLabel": locationObject.selectLabel }
      locations.push(location);
    });
    this.userForm.controls["locations"].setValue(locations);
    this.userForm.controls["avatar"].setValue(this.avatar);
    this.userForm.controls["selectLabel"].setValue(
      this.userForm.controls["fullName"].value +
      " : " +
      this.userForm.controls["phone"].value +
      " : " +
      this.userForm.controls["email"].value
    );
    if (this.userForm.controls["id"].value != "") {
      //condition is valid
      this.userForm.controls["updatedDate"].setValue(new Date());
      this.spinner.show();
      this.userService
        .updateUser(this.userForm.value)
        .subscribe(data => {
          this.notifierService.notify("success", "User updated");
          this.spinner.hide();
          //this.router.navigate(["user-list"]);
        });
    } else {
      //this.userForm.removeControl("id"); //mace
      this.spinner.show();
      this.userService.createUser(this.userForm.value).subscribe(user => {
        this.spinner.hide();
        let password = Math.random().toString(36).slice(-8);
        this.userForm.reset({
          id: 0,
          password: password,
          confirmPassword: password,
          agreed: true,
          status: "Active",
          state: true,
          createdDate: new Date(),
          updatedDate: new Date()
        })
        this.notifierService.notify("success", "User saved");
        //this.router.navigate(["user-list"]);
      });
    }
  }

  readAvatar($event) {
    var files = $event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      var fileReader = new FileReader();
      fileReader.onload = this.handleReader.bind(this);
      fileReader.readAsDataURL(files[i]);
    }
  }

  handleReader(e) {
    var fileReader = e.target;
    this.avatar = fileReader.result;
  }

  removeAvatar() {
    this.avatar = null;
    return false;
  }

  public getRoles() {
    this.roleService
      .getRoles(this.loggedInUserRole, this.loggedInUser.id)
      .subscribe((data: Role[]) => {
        this.rolesList = data;
      });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    document.body.className = "";
    this.sub.unsubscribe();
  }

  changeListener($event): void {
    var value = $event.target;
    var file: File = value.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = e => {
      this.userForm.controls["avatar"].setValue(myReader.result);
      ////console.log(myReader.result);
    };
    myReader.readAsDataURL(file);
  }


}
