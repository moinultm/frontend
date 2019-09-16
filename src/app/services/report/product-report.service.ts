import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';

import { HttpClient } from '@angular/common/http';
import { Product } from '@models/stock/product.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService extends CrudService<Product> {
  constructor(private __http: HttpClient) {
    super(__http);
    this.setUrl('report');
   }


   public getProductSummary(model: any): any {
    this.options.params = undefined;
    return this.__http.get <PartialList<Product>>(this.url + '/'+'product-summary', this.options);
  }


  public postProductSummary(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<Product>>(this.url + '/' +'product-summary', this.options);
  }

}
