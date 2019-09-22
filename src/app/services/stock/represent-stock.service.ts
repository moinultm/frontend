import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class RepresentStockService extends CrudService <RepresentStock> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('represent');
  }


  public findSells(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<RepresentStock>>(this.url + '/'+'get'+ 'sells' , this.options);
  }
}
