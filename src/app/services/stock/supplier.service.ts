import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Subcategory } from '@models/stock/subcategory.model';

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


}
