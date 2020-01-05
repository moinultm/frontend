import { Injectable } from '@angular/core';
import { CustomerService } from '../services/stock/customer.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SellsInvoiceService } from '../services/stock/sells-invoice.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PurchaseOrderService } from '../services/stock/purchase-order.service';


@Injectable()
export class PurchaseListResolver implements Resolve<any> {

  page = 1;
  size =25;

  //solution for today date
todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');


  date = new FormControl(new Date());

   constructor(public purchaseService: PurchaseOrderService,
              private datePipe : DatePipe) { }

   resolve() {
      return this.purchaseService.find({
        page: this.page,
        size: this.size,
        from:  this.todayDate,
        to:   this.todayDate
      }).pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
