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

  findLessons(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 1, pageSize = 3):  Observable<SellsOrder[]> {

    return this.__http.get(this.url, {
        params: new HttpParams()
            .set('courseId', courseId.toString())
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('number', pageNumber.toString())
            .set('size', pageSize.toString())
    }).pipe(
        map(res =>  res["data"])
    );
}

}
