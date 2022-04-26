import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpErrorInterceptor, JwtInterceptor } from './_helpers/';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, EmailValidator } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { NotifierModule } from 'angular-notifier';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserModule } from './user/user.module';
import { ErrorPagesModule } from './error-pages/error-pages.module';
import { CurrencyPipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CustomEmailValidator } from './_validators/custom-email-validator';
import { CustomPhoneValidator } from './_validators/custom-phone-validator';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AuthErrorHandler } from './_handlers/auth-error-handler';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { DatePipe } from "@angular/common";
import { from } from 'rxjs';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ErrorPagesModule,
    LoginModule,
    RegisterModule,
    UserModule,
    ProductModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'middle',
          distance: 18
        },
        vertical: {
          position: 'bottom',
          distance: 62,
          gap: 10
        }
      }
    }),
    NgSelectModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CustomPhoneValidator, CustomEmailValidator,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    CustomEmailValidator,
    CustomPhoneValidator,
    DatePipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
