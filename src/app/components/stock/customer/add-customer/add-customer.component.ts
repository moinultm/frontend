import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '@models/stock/client.model';


@Component({
  selector: 'app-customer',
  templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {

  form: FormGroup;
  data :Client;
  selectedCustomer: Client;


  constructor(private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.data = data;
    }


  ngOnInit() {
this.initSaveForm(this.data)
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
      email: [ client ? client.email : '',  [Validators.required, Validators.maxLength(255)]  ],
      company_name: [ client ? client.company_name : '',  [Validators.required, Validators.maxLength(255)]  ],
      address: [ client ? client.address : '',  [Validators.nullValidator ]],
      opening: [ client ? client.previous_due : '',  [Validators.nullValidator ]],
      account_no: [ client ? client.account_no : '',  [Validators.nullValidator ]],
    });
  }


 save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}



}
