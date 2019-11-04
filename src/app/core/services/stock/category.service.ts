import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { Category } from '@app/shared/models/stock/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CrudService <Category> {

  constructor( _http: HttpClient ) {
    super(_http);
    this.setUrl('category');
  }
}
