import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Client } from '@models/stock/client.model';
import { PartialList } from '@models/common/patial-list.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudService<Client> {

  constructor(private __http: HttpClient ) {
    super( __http);
    this.setUrl('customer');
  }

    //general search
    public findCustomer(query?: {}): any {
      if (query) {
        this.options.params = query;
      } else {
        this.options.params = undefined;
      }
      return this.__http.get <PartialList<Client>>(this.url,this.options);
    }


    public findByPhoneNo(query:Text){
      this.options.params = undefined;
    return this.__http.get <PartialList<Client>>(this.url+'?phone='+ query ,this.options);
  }


    public findDetailsById(id: number): any {
      this.options.params = undefined;

      return this.__http.get <PartialList<Client>>(this.url + '/' + id +'/'+'details', this.options);
    }


    public findCustomerReport(id: number): any {
      this.options.params = undefined;

      return this.__http.get <PartialList<Client>>(this.url + '/' + id +'/'+'report', this.options);
    }
}
