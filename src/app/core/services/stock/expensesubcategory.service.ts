import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';
import { ExpenseSubcategory } from '@app/shared/models/stock/expensesubcategory.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseSubcategoryService extends CrudService<ExpenseSubcategory> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('expensesubcategory');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.put<ExpenseSubcategory>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<ExpenseSubcategory>(this.url, model, this.options);
    }
  }

  public findParent(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<ExpenseSubcategory>>(this.url + '/parent?categoryId=2' , this.options);
  }

  findTable(
    filter :string,
    sortOrder :string,
    pageNumber:number,
    pageSize :number,
    id?:number):  Observable<any[]> {

    return this.__http.get(this.url+'/'+id+'/'+'expense', {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
    }).pipe(map(res =>  res["data"]) );

  }



}
