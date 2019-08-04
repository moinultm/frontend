import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import("@angular/router");

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService  implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
  Observable<boolean> | Promise<boolean> {

   return this.Token.loggedIn();
  }

  constructor(private Token: TokenService) { }
}
