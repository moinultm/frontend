// Angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from   '@angular/router';
import { ActivatedRouteSnapshot } from   '@angular/router';

// JWT Helper service
import { JwtHelperService } from '../jwt-helper.service';

// Application authentication service
import { AuthenticationService } from '../authentication.service';
import { constants } from '@env/constants';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {


  constructor(
    public router: Router,
    private authenticationService: AuthenticationService,
    private jwtHelper: JwtHelperService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRoles = route.data.expectedRoles;
    const expectedRolesType = route.data.expectedRolesType || 'any';
    const userRoles = this.jwtHelper.userRoles();

    if (userRoles === null) {
      this.authenticationService.logout();
      return false;
    }

    const flag = this.checkRoles(expectedRoles, userRoles, expectedRolesType);



if (!flag) {

this.router.navigateByUrl('/auth/login');
//this.router.navigate([constants.auth_url]);
     return false;

} else{
    return true;
}




/*
     if (!flag) {
      this.router.navigate([constants.auth_url]);
      return false;
    } else {
      return true;
    }


*/

  }

  checkRoles(a1: Array<string>, a2: Array<string>, type: string): boolean {
    let result = false;
    switch (type) {
      case 'any':
        result = this.anyRole(a1, a2);
        break;
      case 'all':
        result = this.allRole(a1, a2);
        break;
    }
    return result;
  }


  private anyRole(a1: Array<string>, a2: Array<string>): boolean {
    let result = false;
    a1.forEach((i1: string) => {
      if (a2.indexOf(i1) !== -1) {
        result = true;
      }
    });
    return result;
  }

  private allRole(a1: Array<string>, a2: Array<string>): boolean {
    let count = 0;
    a1.forEach((i1: string) => {
      if (a2.indexOf(i1) !== -1) {
        count++;
      }
    });
    return a1.length === count;
  }

}
