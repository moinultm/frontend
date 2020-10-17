import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';
import { ExpenseSubcategory } from '@app/shared/models/stock/expensesubcategory.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class ParentExpensecategoryService extends CrudService<ExpenseSubcategory> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('parentexpense');
  }

  public findParent(id:number): any {

    return this.__http.get <PartialList <ExpenseSubcategory>> (this.url + '?categoryId='+id , this.options);
  }


}
