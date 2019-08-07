import { Component, OnInit, Inject,OnDestroy, Renderer2 } from '@angular/core';
import { PoolsService } from '@services/security/pools.service';
import { TokenService } from '@services/security/token.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/security/auth.service';
import { Snotify, SnotifyService } from 'ng-snotify';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public form={
    email:null,
    password:null
  }

  public error=null;

  constructor(
    private Pools:PoolsService,
    private Token:TokenService,
    private router: Router,
    private Auth:AuthService,
    private sNotify : SnotifyService,
    private renderer: Renderer2 ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'login-page');
  }

  onSubmit() {
    this.Pools.login(this.form).subscribe(
    data =>this.handleResponse(data),
    error => this.handleError(error)
   );

   }
  handleResponse(data)  {
   this.Token.handle(data.access_token)
   this.Auth.changeAuthStatus(true);
   this.router.navigateByUrl('/dashboard');
  }

   handleError(error){

    let _sNotify = this.sNotify
  _sNotify.confirm('Error', 'Cannot Connect', {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {text: 'Close', action: (toast) => {console.log('Clicked: No'); _sNotify.remove(toast.id); }, bold: true}
      ]
    });
    this.error=error.error.error;
  }


  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'login-page');
  }

}
