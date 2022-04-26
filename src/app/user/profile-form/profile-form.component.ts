import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Role } from 'src/app/_models';
import { UserService, RoleService, AuthenticationService } from '../../_services'
import { first } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Constants } from 'src/constants/constants';

declare var $;
@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  user: any;
  profileForm: FormGroup;
  private sub: any;
  private userId: any;
  loggedInUserRole: any; selectedLocation: any;
  avatar: any;
  emailUsed: boolean = false;
  phoneUsed: boolean = false;
  invalidPhone: boolean = false;
  usernameUsed: boolean = false;
  cover: any;

  constructor(private changeReference: ChangeDetectorRef, private formBuilder: FormBuilder, private router: Router, private userService: UserService, private notifierService: NotifierService, private activatedRoute: ActivatedRoute, private roleService: RoleService, private authenticationService: AuthenticationService) {
    this.profileForm = this.formBuilder.group(new User());
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.profileForm.controls['agreed'].setValue(true);
    if (this.userId) {
      this.userService.getUserByUuid(this.userId)
        .subscribe(data => {
          //console.log(data);
          this.profileForm.controls['id'].setValue(data.id);
          this.profileForm.controls['fullName'].setValue(data.fullName);
          this.profileForm.controls['email'].setValue(data.email);
          this.profileForm.controls['phone'].disable();
          this.profileForm.controls['phone'].setValue(data.phone);
          this.profileForm.controls['agreed'].setValue(data.agreed);
          this.profileForm.controls["avatar"].setValue(data.avatar);
          this.avatar = data.avatar;
          this.profileForm.controls['state'].setValue(data.state);
          this.profileForm.controls['status'].setValue(data.status);
          this.profileForm.controls['createdDate'].setValue(new Date(data.createdDate));
          this.profileForm.controls['role'].setValue(data.role);
          this.cover = data.cover;
        });
    }
    this.loggedInUserRole = authenticationService.decodeRole(); this.selectedLocation = authenticationService.decodeSelectedLocation();


  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red layout-top-nav fixed';
    this.profileForm.controls["password"].clearValidators();
    this.profileForm.controls["password"].updateValueAndValidity();
    this.profileForm.controls["confirmPassword"].clearValidators();
    this.profileForm.controls["confirmPassword"].updateValueAndValidity();
  }

  get fields() { return this.profileForm.controls; }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isEmailUsed(email) {
    if (this.validateEmail(email)) {
      this.userService.checkEmail(email).subscribe(data => {
        this.emailUsed = data;
        if (data) {
          this.profileForm.controls['email'].setErrors({ 'incorrect': true });
        } else {
          this.profileForm.controls['email'].setErrors(null);
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
          this.profileForm.controls['phone'].setErrors({ 'incorrect': true });
        } else {
          this.profileForm.controls['phone'].setErrors(null);
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

  saveProfile() {
    this.profileForm.controls["avatar"].setValue(this.avatar);
    if (this.profileForm.controls['id'].value != '') {
      this.userService.updateProfile(this.profileForm.value).subscribe((data: any) => {
          this.notifierService.notify('success', 'Profile has been updated successfully.');
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
  }

  ngOnDestroy(): void {
    document.body.className = '';
    this.sub.unsubscribe();
  }

  changeListener($event): void {
    var value = $event.target;
    var file: File = value.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.profileForm.controls['image'].setValue(myReader.result);
      ////console.log(myReader.result);
    }
    myReader.readAsDataURL(file);
  }

  readCover($event) {
    var files = $event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      var fileReader = new FileReader();
      fileReader.onload = this.handleReaderForCover.bind(this);
      fileReader.readAsDataURL(files[i]);
    }
  }

  handleReaderForCover(e) {
    var fileReader = e.target;
    this.cover = fileReader.result;
  }

  removeCover() {
    this.cover = null;
  }

}
