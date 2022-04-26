import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockerRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MomentModule } from 'ngx-moment';
import { LayoutModule } from '../layout/layout.module';
import { ProductListViewComponent } from './product-list-view/product-list-view.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductListViewComponent],
  imports: [
    CommonModule,
    LockerRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    NgSelectModule,
    MomentModule,
  ]
})
export class ProductModule { }
