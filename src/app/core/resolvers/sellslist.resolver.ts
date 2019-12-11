import { Injectable } from '@angular/core';
import { CustomerService } from '../services/stock/customer.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SellsInvoiceService } from '../services/stock/sells-invoice.service';


@Injectable()
export class SellsListResolver implements Resolve<any> {
   constructor(public sellsListService: SellsInvoiceService) { }

   resolve() {
      return this.sellsListService.find().pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
