import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/stock/product.model';
import { Client } from '@models/stock/client.model';
import { PartialList } from '@models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService <Product> {

  constructor( private __http: HttpClient ) {
    super(__http);
    this.setUrl('product');
  }


  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get<Product>(this.url + '/' + id +'/'+'details', this.options);
  }



  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<Product>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      return this.__http.post<Product>(this.url, model, this.options);
    }
  }


  public saveGift(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.post<Product>(this.url + '/' + model.get('id'), model, this.options);
    } else {
      return this.__http.post<Product>(this.url, model, this.options);
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
