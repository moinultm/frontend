import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';

import { HttpClient } from '@angular/common/http';
import { Product } from '@models/stock/product.model';
import { PartialList } from '@models/common/patial-list.model';
import { SellsInvoice } from '@models/stock/invoice.model';
import { PurchaseOrder } from '@models/stock/purchase-order.model';

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



  public representStockReport(id:number,query?: {}): any {

    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }

    return this.__http.get <PartialList<Product>>(this.url + '/' + id +'/'+'represent-stock', this.options);
  }



  public productSellReport(query?: {}): any {

    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }

    return this.__http.get <PartialList<Product>>(this.url + '/'+'product-sells-report', this.options);
  }



  public sellsStatusReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<Product>>(this.url + '/'+'sells-report', this.options);
  }



  public stockGeneralReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<SellsInvoice>>(this.url + '/'+'stock-general-report', this.options);
  }


  public purchaseReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<PurchaseOrder>>(this.url + '/'+'purchase-report', this.options);
  }





  public representativeStockReport(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<SellsInvoice>>(this.url + '/'+ id + '/'+'represent-stock-report', this.options);
  }

  public representativePaymentReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<SellsInvoice>>(this.url  + '/'+'represent-payment-report', this.options);
  }



}
