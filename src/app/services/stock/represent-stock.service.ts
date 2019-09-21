import { Injectable } from '@angular/core';
import { CrudService } from '@services/common/crud.service';
import { HttpClient } from '@angular/common/http';
import { RepresentStock } from '@models/stock/represent-stock.model';

@Injectable({
  providedIn: 'root'
})
export class RepresentStockService extends CrudService <RepresentStock> {

  constructor( _http: HttpClient ) { 
    super(_http);
    this.setUrl('represent');
  }
  
}
