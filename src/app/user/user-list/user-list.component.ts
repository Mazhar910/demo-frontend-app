import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService, AuthenticationService, } from '../../_services'
import { User } from 'src/app/_models/user.model';
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';
import { Role } from 'src/app/_models';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {

  users: any[];
  loggedInUser: any;
  loggedInUserRole: any; selectedLocation: any;

  private readonly notifier: NotifierService;
  constructor(private router: Router, private userService: UserService, private notifierService: NotifierService, private changeReference: ChangeDetectorRef, private authenticationService: AuthenticationService, private spinner: NgxSpinnerService) {
    this.notifier = notifierService;
    this.loggedInUser = authenticationService.decodeUser();
    this.loggedInUserRole = authenticationService.decodeRole(); this.selectedLocation = authenticationService.decodeSelectedLocation();

  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-red layout-top-nav fixed layout-footer-fixed';
    this.getUsers();
  }

  public getUsers() {
    this.spinner.show();
    this.userService.getUsers(this.loggedInUserRole, this.selectedLocation.id).subscribe((data: User[]) => {
      this.users = data;
      this.changeReference.detectChanges();
      $('#list-user-table').dataTable({
        "scrollY": "300px",
        "scrollCollapse": true,
        "paging": false,
        order: [[1, "desc"]],
        dom: 'Bfrtip', buttons: ['csv', 'excel', 'pdf', 'print']
      });
      this.spinner.hide();
    });
  }

  public deleteUser(id: any) {
    this.spinner.show();
    this.userService.updateState(id).subscribe((data: Array<object>) => {
      $('#list-user-table').dataTable().fnDestroy();
      this.getUsers();
      this.notifier.notify('success', 'User removed');
      this.spinner.hide();
    });

  }
  public toggleUser(user: any) {
    user.status = (user.status == 'Active') ? 'Inactive' : 'Active';
    user.updatedDate = new Date();
    this.userService.updateStatus(user).subscribe((data: any) => {
      this.notifierService.notify(user.status == 'Active' ? "success" : "error" , user.fullName + " is now " + user.status);
    });
  }

  editUser(user: any): void {
    this.router.navigate(['/user-form', user.uuid]);
  };

  addUser(): void {
    this.router.navigate(['user-form']);
  };

  ngOnDestroy(): void {
    document.body.className = '';
  }

}
