import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/stock/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService <Product> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('product');
  }


  public findById(id: number): any {
    this.options.params = undefined;

    return this.__http.get<Product>(this.url + '/' + id, this.options);
  }


}
