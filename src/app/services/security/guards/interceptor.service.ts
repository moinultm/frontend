// Angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Angular Http client modules
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// Observable modules
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

// Application constants
import { constants } from 'environments/constants';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {


  constructor(
    private router: Router
  ) {

  }


  private applyCredentials(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(constants.access_token)}`
      }
    });
  }


  intercept(
    req: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.doRequest(req, next, true);
  }


  private doRequest(req: HttpRequest<any>, next: HttpHandler, setAuthorization = false): any {
    if (setAuthorization) {
      req = this.applyCredentials(req);
    }
    return next.handle(req)
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate([constants.auth_url]);
          } else if (err.status === 500) {
            this.router.navigateByUrl(constants.error_500);
          }
        }
        return ErrorObservable.create(err);
      });
  }


}
