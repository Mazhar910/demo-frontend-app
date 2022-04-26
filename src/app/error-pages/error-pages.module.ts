import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';
import { NotAllowedComponent } from './not-allowed/not-allowed.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorPagesRoutingModule
  ],
  declarations: [NotFoundComponent, InternalServerErrorComponent, NotAllowedComponent]
})
export class ErrorPagesModule { }
