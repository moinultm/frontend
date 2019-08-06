import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
public loggedIn :boolean;

  constructor(private Auth: AuthService,
    private router: Router,
    private Token : TokenService) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value=>this.loggedIn=value);
  }

logout(Event: MouseEvent){
  event.preventDefault();
  this.Token.remove();
  this.Auth.changeAuthStatus(false);
  this.router.navigateByUrl('/login');
}

}
