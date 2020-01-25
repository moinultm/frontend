
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';


import { ConfigService } from '../../core/utils/config.service';

import { AuthenticationService } from '@app/core/services/security/authentication.service';
import { Router } from '@angular/router';


import { constants } from '@env/constants';


import { warning } from '../../core/utils/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;


  loading: boolean;


  constructor(
    private config: ConfigService,
    private authenticationService: AuthenticationService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    titleService: Title,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'login-page');

     this.config.setSettings({
      navbar: false,
      sidebar: false,
      footer: false
    });

     this.buildForm();
     titleService.setTitle(constants.app_name + ' - Authentication');
  }


  ngOnInit(): void {this.loading = false; }

  private buildForm(): void {
    this.form = this._fb.group({
      username: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', Validators.required ]
    });

  }



  login() {
    this.loading = true;
    this.authenticationService.obtainAccessToken({
        username: this.form.get('username').value,
        password: this.form.get('password').value
      }).subscribe(
        (res: any) => {
          this.authenticationService.saveToken(res.access_token);
          this.loading = false;
          //return  this._router.navigateByUrl('/dashboard');
        return this._router.navigate([constants.home_url]);
        }, (error :any) => {
          warning('Authentication error!', 'Username or password entered is incorrect', this._toastr);
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.config.setSettings(this.config.defaultSettings());
    this.renderer.removeClass(document.body, 'login-page');
  }



}
