import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { AuthGuard, RoleGuard } from '../_guards';
import { ProductListViewComponent } from './product-list-view/product-list-view.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard, RoleGuard] },
      { path: 'product-list-view', component: ProductListViewComponent, canActivate: [AuthGuard, RoleGuard] }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockerRoutingModule { }
