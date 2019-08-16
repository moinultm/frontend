import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@services/common/crud.service';
import { Client } from '@models/stock/client.model';
 

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends CrudService<Client> {

  constructor( _http: HttpClient ) { 
    super( _http);
    this.setUrl('customer');
  }

 

}
