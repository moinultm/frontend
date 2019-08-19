import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { SellsOrder } from '@models/stock/sellsorder.model';

@Injectable({
  providedIn: 'root'
})
export class SellsOrderService extends CrudService<SellsOrder> {

  constructor(_http: HttpClient ) {
    super(_http);
    this.setUrl('sell');
  }

}
