import { Injectable } from '@angular/core';
import { CustomerService } from '../services/stock/customer.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SellsInvoiceService } from '../services/stock/sells-invoice.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SupplierService } from '../services/stock/supplier.service';


@Injectable()
export class SupplierListResolver implements Resolve<any> {




  date = new FormControl(new Date());

   constructor(public supplierService: SupplierService   ) { }

   resolve() {
      return this.supplierService.findSupplier().pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
