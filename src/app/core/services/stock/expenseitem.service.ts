import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { ExpenseItem } from '@app/shared/models/stock/expenseitem.model';
import { Client } from '@app/shared/models/stock/client.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseItemService extends CrudService <ExpenseItem> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('expenseitem');
  }

  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get<ExpenseItem>(this.url + '/' + id +'/'+'details', this.options);
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<ExpenseItem>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<ExpenseItem>(this.url, model, this.options);
    }
  }


  public listProduct(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<Client>>(this.url,this.options);
  }

}
