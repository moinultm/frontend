import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '@app/shared/models/stock/client.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { warning, success } from '@app/core/utils/toastr';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Payment } from '@app/shared/models/stock/payment.model';
import { PaymentService } from '@app/core/services/stock/payment.service';


@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  form: FormGroup;
  LOCAL_data :number;
  selectedCustomer: Client;
  ResultData: any;
  loadingDetails:boolean;

  selectedType:Payment;

  savingPayment:boolean;


  details:any ;

  constructor(private customerService: CustomerService,
    private paymentService:PaymentService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private clientService: CustomerService,
    private dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.LOCAL_data = data;
    }


  ngOnInit() {
   this.loadDetails(this.LOCAL_data);
   this.IniCollection();
  }

  loadDetails(id:number){
    this.loadingDetails = true;
    this.clientService.findDetailsById(id).subscribe((res:PartialList <Client>) => {
      this.details = res;
      console.log(this.details);
      this.loadingDetails = false;
    });

  }

 save() {}

close() {
    this.dialogRef.close({ data: 'close'});
}


IniCollection(payment?: Payment): void {

  if (payment) {
    this.selectedType = Object.assign(Payment, payment);
  } else {
    this.selectedType = new Payment();
  }
  this.form = this._formBuilder.group({
    client_id: [ payment ? payment.client_id : this.LOCAL_data,  [Validators.nullValidator]  ],
    amount: [ payment ? payment.amount : '',  [Validators.required]  ],
    type: [ payment ? payment.type : 'credit',  [Validators.nullValidator]  ],
    method: [ payment ? payment.method : '',  [Validators.required]  ],
    note: [ payment ? payment.note : '',  [Validators.nullValidator]  ]
  });
}

saveCollection(){

  if (this.form.valid) {
    this.savingPayment = true;
    this.paymentService.save({
      client_id: this.LOCAL_data,
      amount: this.form.get('amount').value,
      type: 'credit',
      method: this.form.get('method').value,
      note: this.form.get('note').value

  }, false).subscribe((res: Payment) => {
    this.savingPayment = false;
    success('Success!', "Saved", this._toastr);
  }, (err: any) => {
    if (err.status === 403) {
      err.error.forEach((e: string) => {

        warning('Warning!', e, this._toastr);

      });
    } else if (err.status === 500) {
      warning('Error!', err, this._toastr);

    }
    this.savingPayment = false;
  });
}


  }




}



