import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { RepresentStock } from '@app/shared/models/stock/represent-stock.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class RepresentStockService extends CrudService <RepresentStock> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('represent');
  }

  public findChallans(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+id+'/'+ 'challans' , this.options);
  }


  public findSells(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+id+'/'+ 'sells' , this.options);
  }


  public salesInvoices(id:number,query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+id+'/'+ 'invoices' , this.options);
  }


  public viewInvoice(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+'id'+'/'+ 'details' , this.options);
  }


  public updateReceiving(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+'id'+'/'+ 'receiving' , this.options);
  }


  public delete(model: any): any {
    this.options.params = undefined;
    return this.__http.post <PartialList<RepresentStock>>  (this.url + '/'+   model.id   + '/'+ 'delete' , model, this.options)
  }



}
