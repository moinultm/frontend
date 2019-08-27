import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellsOrderService extends CrudService<SellsOrder> {

   
  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('sell');
  }


}
