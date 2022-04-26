import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {LayoutModule} from '../layout/layout.module';
import { ReactiveFormsModule }    from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserFormComponent } from './user-form/user-form.component';
import { MomentModule } from 'ngx-moment';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    NgSelectModule,
    MomentModule
  ],
  declarations: [UserListComponent, UserFormComponent, ProfileFormComponent, ChangePasswordFormComponent]
})
export class UserModule { }
