import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PartialList } from '@app/shared/models/common/patial-list.model';

@Injectable({
  providedIn: 'root'
})
export class SellsReturnService extends CrudService<SellsInvoice> {

  list : PartialList<SellsInvoice>;

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('return');
  }


  findTable(
    filter :string,
    sortOrder :string,
    pageNumber:number,
    pageSize :number):  Observable<any[]> {

    return this.__http.get(this.url , {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('page', pageNumber.toString())
            .set('size', pageSize.toString())
    }).pipe(map(res =>  res["data"]) );

  }
 

  public delete(model: any): any {
    this.options.params = undefined;
    return this.__http.post <PartialList<SellsInvoice>>  (this.url + '/'+   model.id   + '/'+ 'delete' , model, this.options)
  }
 

  public findOrderDetailsId(id: number): any {
    this.options.params = undefined;

    return this.__http.get<PartialList<SellsInvoice>>(this.url + '/' + id+'/'+'details', this.options);
  }

 
 




}
