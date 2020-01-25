import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { AuthenticationService } from '@app/core/services/security/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
public loggedIn :boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public jwtHelper: JwtHelperService) { }

  ngOnInit() {

   }

logout() : void{

  this.authenticationService.logout();

}

}
