import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { PurchaseOrder } from '@models/stock/purchase-order.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService extends CrudService<PurchaseOrder> {


  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('purchase');
  }

  findTable(
    filter :string,
    sortOrder :string,
    pageNumber:number,
    pageSize :number):  Observable<any[]> {

    return this.__http.get(this.url , {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
    }).pipe(map(res =>  res["data"]) );

  }


  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get <PartialList<PurchaseOrder>>(this.url + '/' + id +'/'+'details', this.options);
  }

  public getReturnSellById(id: number): any {
    this.options.params = undefined;
    return this.__http.get <PartialList<PurchaseOrder>>(this.url + '/' +'return'+ '/' + id , this.options);
  }

  public postReturnSellById(model: any): any {
    this.options.params = undefined;
    return this.__http.post <PartialList<PurchaseOrder>>  (this.url + '/'+'return' + model.id, model, this.options)

  }


  public getList(): any {
    this.options.params = undefined;
    return this.__http.get <PartialList<PurchaseOrder>>(this.url + '/' +'list'+'/'+'pi', this.options);
  }


}
