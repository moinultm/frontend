import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';

import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Expense } from '@app/shared/models/stock/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends CrudService<Expense> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('expense');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.put<Expense>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<Expense>(this.url, model, this.options);
    }
  }


  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get <PartialList<Expense>>(this.url + '/' + id +'/'+'details', this.options);
  }


    //general search
    public findSupplier(query?: {}): any {
      if (query) {
        this.options.params = query;
      } else {
        this.options.params = undefined;
      }
      return this.__http.get <PartialList<Expense>>(this.url,this.options);
    }




}
