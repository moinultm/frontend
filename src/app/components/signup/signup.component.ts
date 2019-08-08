import { Component, OnInit } from '@angular/core';
import { PoolsService } from '@services/auth/pools.service';
import { TokenService } from '@services/auth/token.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };

  public error =[];

  constructor(
    private Pools:PoolsService,
    private Token:TokenService,
    private router: Router) { }

  ngOnInit() {  }

  onSubmit(){
    this.Pools.signup(this.form).subscribe(
    data =>this.handleResponse(data),
    error => this.handleError(error)
    );

  }

  handleResponse(data)  {
    this.Token.handle(data.access_token)
    this.router.navigateByUrl('/profile');
   }

  handleError(error){
   this.error=error.error.errors;
 }

}
