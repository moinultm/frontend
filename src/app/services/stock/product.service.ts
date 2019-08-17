import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '@models/stock/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService <Product> {

  constructor( _http: HttpClient ) { 
    super(_http);
    this.setUrl('product');
  }
}
