import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private spinner: NgxSpinnerService,
        private notifier: NotifierService,
        private ngZone: NgZone,
        private injector : Injector) {
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* return next.handle(request).pipe(retry(1), catchError((error: HttpErrorResponse) => { */
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
                console.log(errorMessage);
                this.spinner.hide();
                this.notifier.notify("error", "Something went wrong");
            } else {
                // server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                this.spinner.hide();
                if (error.status == 401) {
                    const router = this.injector.get(Router);
                    localStorage.clear();
                    this.notifier.notify("error", "Session expired. Please login again");
                    this.ngZone.run(() => router.navigate(['/login'], )).then();
                } else {
                    this.notifier.notify("error", "Something went wrong");
                }
            }
            //window.alert(errorMessage);
            return throwError(errorMessage);
        })
        )
    }
}