import { Injectable } from '@angular/core';
import { CrudService } from '@app/core/services/common/crud.service';
import { Vat } from '@app/shared/models/common/vat.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VatService extends CrudService <Vat> {
  constructor( _http: HttpClient ) {
    super(_http);
    this.setUrl('vat');
  }
}
