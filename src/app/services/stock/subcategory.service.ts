import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Subcategory } from '@models/stock/subcategory.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService extends CrudService<Subcategory> {

  constructor(private __http: HttpClient ) { 
    super(__http);
    this.setUrl('subcategory');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<Subcategory>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      return this.__http.post<Subcategory>(this.url, model, this.options);
    }
  }

  public findParent(query?: {}): any {
    if (query) {
      this.options.params = query;
    } else {
      this.options.params = undefined;
    }
    return this.__http.get <PartialList<Subcategory>>(this.url + '/parent?categoryId=2' , this.options);
  }


}
