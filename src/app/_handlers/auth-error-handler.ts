import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(private notifierService: NotifierService,private ngZone: NgZone, private spinnerService : NgxSpinnerService ,private authenticationService: AuthenticationService, private injector: Injector) { }

    handleError(error) {
        const router = this.injector.get(Router);
        if (error.status === 401) {
            this.spinnerService.hide();
            localStorage.clear();
            this.ngZone.run(() => router.navigate(['/login'], { queryParams: { success: "Your session was expired. Kindly login again." } })).then();
        }
        //throw error;
    }
}