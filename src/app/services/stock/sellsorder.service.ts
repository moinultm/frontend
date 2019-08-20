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

  resultsLength = 0;

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('sell');
  }

  findLessons(
    filter :string,
    sortOrder :string,
    pageNumber:number,
    pageSize :number):  Observable<SellsOrder[]> {

    return this.__http.get(this.url, {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
    }).pipe(
   
       // map(res =>  res["data"])
       map(res => {
        //this.resultsLength = res.total[''];
        return res["data"];
      })
    );
}

}
