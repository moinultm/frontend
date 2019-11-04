import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@app/core/services/common/crud.service';

import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Payment } from '@app/shared/models/stock/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends CrudService<Payment> {

  constructor(private __http: HttpClient ) {
    super(__http);
    this.setUrl('payment');
  }


}
