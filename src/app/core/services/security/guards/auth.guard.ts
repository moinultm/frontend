
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';


import { constants } from 'environments/constants';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      localStorage.getItem(constants.access_token)
    ) { return true; }
    localStorage.removeItem(constants.access_token);
    this.router.navigate([constants.auth_url]);
    return false;
  }

}
