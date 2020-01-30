import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';

import { HttpClient } from '@angular/common/http';
import { Product } from '@app/shared/models/stock/product.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { PurchaseOrder } from '@app/shared/models/stock/purchase-order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService extends CrudService<Product> {
  constructor(private __http: HttpClient) {
    super(__http);
    this.setUrl('report');
   }


   public getProductReport(model: any): any {
    this.options.params = undefined;
    return this.__http.get <PartialList<Product>>(this.url + '/'+'product-report', this.options);
  }


  public postProductReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<Product>>(this.url + '/' +'product-report', this.options);
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



  public stockReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url +  '/'+'stock-report', this.options);
  }


  public stockInReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url +  '/'+'stockin-report', this.options);
  }

  public stockOutReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url +  '/'+'stockout-report', this.options);
  }



  public challanReport(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url + '/'+ id  + '/'+'challan-report', this.options);
  }

  public damageReport(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url + '/'+ id  + '/'+'damage-report', this.options);
  }

  public giftReport(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <any>(this.url + '/'+ id  + '/'+'gift-report', this.options);
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


  public representativeCollectionReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<SellsInvoice>>(this.url  + '/'+'represent-collection-report', this.options);
  }



  public profitLossReport(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<SellsInvoice>>(this.url + '/'+'profit-loss-report', this.options);
  }

}
