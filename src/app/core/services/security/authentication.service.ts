// Angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 import { HttpClient,HttpParams, HttpHeaders} from '@angular/common/http';


// Observable modules
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

// Environment and application constants
import { environment } from '@env/environment';
import { constants } from '@env/constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {


  CLIENT_ID = 2;
  CLIENT_SECRET = 'HjmvW1KdfN1yXILxRlkPzSLOzeuSe0vlsfzf5s4l';



  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }


  obtainAccessToken2(loginData: any): Observable<any> {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', '' + this.CLIENT_ID);

    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
   });

   let options = {      headers: headers   }

    return this._http.post(environment.auth_url + 'token', params.toString())
      .map((res: any) => res.json())
      .catch(err => ErrorObservable.create(err));
  }


  obtainAccessToken(loginData: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('client_id',''+this.CLIENT_ID);
    body.set('client_secret', this.CLIENT_SECRET);
    body.set('username', loginData.username);
    body.set('password', loginData.password);
    body.set('scope', '');

    return this._http.post(environment.auth_url + 'token', body.toString(), { headers })
      .pipe(
        map((response: any) => {
          //localStorage.setItem('session', JSON.stringify(response));
          return response;
        })
      );
  }


  saveToken(token: string): void {
    localStorage.setItem(constants.access_token, token);
  }

  logout(): void {
    localStorage.removeItem(constants.access_token);
    this._router.navigateByUrl(constants.auth_url);
  }


  forgotPassword(username: string): Observable<any> {
    return this._http.post(environment.auth_url + 'forgot-password', { email: username });
  }


  recoverPassword(model: any, token: string): Observable<any> {
    return this._http.put(environment.auth_url + 'recover-password/' + token, model);
  }



}

//https://blog.flicher.net/laravel-rest-api-passport-authentication-for-ionic-app/
//https://github.com/dedd1993/ngx-admin/blob/master/src/app/core/services/auth.service.ts
