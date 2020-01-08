import { Injectable } from '@angular/core';
import { CustomerService } from '../services/stock/customer.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductService } from '../services/stock/product.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Injectable()
export class ProductListResolver implements Resolve<any> {

  page = 1;
  size = 100;

  date = new FormControl(new Date());

   constructor(public productListService: ProductService,
              private datePipe : DatePipe) { }

   resolve() {
      return this.productListService.find({
        page: this.page,
        size: this.size,
      }).pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
