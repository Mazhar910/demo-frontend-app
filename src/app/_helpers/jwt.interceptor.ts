import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log('Inside Interceptor');
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser && loggedInUser.jwt) {
            //console.log(loggedInUser.jwt);
            const authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY , `Bearer ${loggedInUser.jwt}`)
            });
            //console.log(authReq.headers.keys());
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}
