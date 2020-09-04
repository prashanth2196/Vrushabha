import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LoaderService } from '../common/loader.service';
import { finalize } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    private totalRequests = 0;
    constructor(private utilityService: UtilityService) { }
    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
        let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo'));
        var headers = null;
        if (request.url.includes('/Import/Upload') || request.url.includes('/Import/Import')) {
            headers = {
                Authorization: `Bearer ${tokenInfo}`
            }
        }
        else {
            headers = {
                Authorization: `Bearer ${tokenInfo}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
        if (tokenInfo) {
            request = request.clone({
                setHeaders: headers
            });
        }
        this.totalRequests++;
        // this.loaderService.showSpinner();
        this.updateToken();
        return newRequest.handle(request).pipe(
            finalize(() => {this.decreaseRequests()})
        );
    }

    private decreaseRequests() {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            // this.loaderService.hideSpinner();
        }
    }

    private updateToken() {
        var sessionTime = this.utilityService.try_parse_int(localStorage.getItem("sessionTimeInMin"));
        if (sessionTime > 0) {
            sessionTime = (sessionTime - 1) * 60;
            var currentTime = this.utilityService.try_parse_int(localStorage.getItem("activeFrom"));
            if (currentTime < 0) {
                return;
            }
            let secLeft = sessionTime - currentTime;
            // if (secLeft > 180 && secLeft < 600)
            //     // this.utilityService.updateToken = true;
        }
    }
}   