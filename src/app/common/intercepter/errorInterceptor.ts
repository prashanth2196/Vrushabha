import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
        return newRequest.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                let sessionId = localStorage.getItem('SessionID');
                // this.authenticationService.logout(sessionId);
                if(err.error && err.error.Code == 409)
                    err.message = 'There are currently multiple sessions logged in with this username. Please login again.';
                else
                    err.message = 'Session timed out. Please login again';
            }
            else if(err.status === 417){
                err.message = err.statusText;
            }
            else {
                // const error = err.error.message || err.statusText;
                err.message = 'Server failed to respond.';
            }
            return Observable.throw(err);
        }));
    }
}