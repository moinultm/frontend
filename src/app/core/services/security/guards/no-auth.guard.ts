// Angular modules
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';

// Application constants
import { constants } from 'environments/constants';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (
      !localStorage.getItem(constants.access_token)
    ) {
      localStorage.removeItem(constants.access_token);
      return true;
    }
    this.router.navigate([constants.home_url]);
    return false;
  }

}
