import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
 import { HttpClient } from '@angular/common/http';
import { Product } from '@app/shared/models/stock/product.model';

@Injectable({
  providedIn: 'root'
})
export class DamageService extends CrudService <Product> {

  constructor( private __http: HttpClient) {
    super(__http);
    this.setUrl('damages');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.put<Product>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<Product>(this.url, model, this.options);
    }
  }


  public delete(model: any): any {
    this.options.params = undefined;
    return this.__http.post <any>  (this.url + '/'+   model.id   + '/'+ 'delete' , model, this.options)
  }


}
