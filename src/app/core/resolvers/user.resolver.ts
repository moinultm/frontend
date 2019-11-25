import { Injectable } from '@angular/core';
import { UserService } from '@app/core/services/security/user.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class UserResolver implements Resolve<any> {
   constructor(public userListService: UserService) { }

   resolve() {
      return this.userListService.findRepresentative().pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
