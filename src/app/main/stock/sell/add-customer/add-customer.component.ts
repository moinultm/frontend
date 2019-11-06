import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '@app/shared/models/stock/client.model';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { warning } from '@app/core/utils/toastr';


@Component({
  selector: 'add-customer',
  templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {

  form: FormGroup;
  LOCAL_data :Client;
  selectedCustomer: Client;
  ResultData: any;
savingType:string;

  savingCustomer:boolean;

  constructor(private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {
      this.LOCAL_data = data;

    }


  ngOnInit() {
this.initSaveForm(this.LOCAL_data)
  }


  initSaveForm(client?: Client): void {
    if (client) {
      this.selectedCustomer = Object.assign(Client, client);
    } else {
      this.selectedCustomer = new Client();
    }
    this.form = this._formBuilder.group({
      full_name: [ client ? client.full_name : '',  [Validators.required, Validators.maxLength(255)]  ],
      contact: [ client ? client.contact : '',  [Validators.required, Validators.maxLength(255)]  ],
      client_code:[ client ? client.client_code : '',  [Validators.required, Validators.maxLength(255)]  ],
      email: [ client ? client.email : '',  [Validators.required, Validators.maxLength(255)]  ],
      company_name: [ client ? client.company_name : '',  [Validators.required, Validators.maxLength(255)]  ],
      address: [ client ? client.address : '',  [Validators.nullValidator ]],
      opening: [ client ? client.previous_due : '',  [Validators.nullValidator ]],
      account_no: [ client ? client.account_no : '',  [Validators.nullValidator ]],
    });
  }


 save() {

  if (this.form.valid) {
    this.savingCustomer = true;
    this.customerService.save({
      id: this.selectedCustomer.id,
      full_name: this.form.get('full_name').value,
      contact: this.form.get('contact').value,
      client_code:this.form.get('client_code').value,
      email: this.form.get('email').value,
      company_name: this.form.get('company_name').value,
      address: this.form.get('address').value,
      opening: this.form.get('opening').value,
      account_no: this.form.get('account_no').value,


    }, this.selectedCustomer.id ? true : false).subscribe((res: Client) => {
      this.savingCustomer = false;
      this.dialogRef.close({ data: 200});
    }, (err: any) => {
      if (err.status === 403) {
        err.error.forEach((e: string) => {

          warning('Warning!', e, this._toastr);

        });
      } else if (err.status === 500) {
         this.dialogRef.close({ data: err.status});
      }
      this.savingCustomer = false;
    });
  }

}

close() {
    this.dialogRef.close({ data: 'close'});
}



}
