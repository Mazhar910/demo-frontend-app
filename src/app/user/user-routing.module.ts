import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component'
import { UserFormComponent } from './user-form/user-form.component'
import { AuthGuard,RoleGuard } from '../_guards';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'user-form/:id', component: UserFormComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'profile-form/:id', component: ProfileFormComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'change-password-form/:id', component: ChangePasswordFormComponent, canActivate: [AuthGuard,RoleGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
