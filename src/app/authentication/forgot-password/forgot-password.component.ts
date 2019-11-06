// Angular components
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Application layout configuration service
import { ConfigService } from '@app/core/utils/config.service';

// Application services
import { AuthenticationService } from '@app/core/services/security/authentication.service';
import { Router } from '@angular/router';

// Application constants
import { constants } from '@env/constants';

// Toastr services
import { error, success, warning } from '@app/core/utils/toastr';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  /**
   * Form
   */
  form: FormGroup;

  /**
   * An indicator for login in progress
   */
  loading: boolean;

  /**
   * Component constructor
   *
   * @param config The configuration service
   * @param authenticationService The authentication service
   * @param _fb The form builder object
   * @param _router The router object
   * @param _toastr The toastr service
   * @param titleService The title service
   *
   * @author EL OUFIR Hatim <eloufirhatim@gmail.com>
   */
  constructor(
    private config: ConfigService,
    private authenticationService: AuthenticationService,
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    titleService: Title
  ) {
    // Update application layout settings
    this.config.setSettings({
      navbar: false,
      sidebar: false,
      footer: false
    });
    // Build the login form
    this.buildForm();
    // Set the page title
    titleService.setTitle(constants.app_name + ' - Forgot password?');
  }

 
  ngOnInit(): void { }

  private buildForm(): void {
    this.form = this._fb.group({
      username: [ '', [ Validators.required, Validators.email ] ]
    });
  }


  forgot(): void {
    this.loading = true;
    this.authenticationService.forgotPassword(this.form.get('username').value)
      .subscribe(() => {
        this.buildForm();
        this.loading = false;
        success('Success!', 'An email was sent to you, containing the recover password steps.', this._toastr);
      }, (err: any) => {
        if (err.status === 403) {
          warning('Error!', 'The email address entered does not match with any account.', this._toastr);
        } else {
          error('Error!', 'An internal error has occured, please contact system administrator.', this._toastr);
        }
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.config.setSettings(this.config.defaultSettings());
  }

}
