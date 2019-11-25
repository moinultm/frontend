import { Injectable } from '@angular/core';
import { CustomerService } from '../services/stock/customer.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class CustomerResolver implements Resolve<any> {
   constructor(public categoryListService: CustomerService) { }

   resolve() {
      return this.categoryListService.findCustomer().pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
