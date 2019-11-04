import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';

import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Warehouse } from '@app/shared/models/stock/warehouse.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends CrudService<Warehouse> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('warehouse');
  }

  public save(model: any, update?: boolean): any {
    this.options.params = undefined;
    if (update) {
      return this.__http.put<Warehouse>(this.url + '/' + model.id, model, this.options);
    } else {
      return this.__http.post<Warehouse>(this.url, model, this.options);
    }
  }


  public findDetailsById(id: number): any {
    this.options.params = undefined;

    return this.__http.get <PartialList<Warehouse>>(this.url + '/' + id +'/'+'details', this.options);
  }


    //general search
    public findSupplier(query?: {}): any {
      if (query) {
        this.options.params = query;
      } else {
        this.options.params = undefined;
      }
      return this.__http.get <PartialList<Warehouse>>(this.url,this.options);
    }




}
