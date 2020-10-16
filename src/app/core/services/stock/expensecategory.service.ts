import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { ExpenseCategory } from '@app/shared/models/stock/expensecategory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService extends CrudService <ExpenseCategory> {

  constructor( _http: HttpClient ) {
    super(_http);
    this.setUrl('expensecategory');
  }
}
