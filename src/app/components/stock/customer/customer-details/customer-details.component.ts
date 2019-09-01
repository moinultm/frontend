import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '@models/stock/client.model';
import { CustomerService } from '@services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { warning } from '@services/core/utils/toastr';


@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  form: FormGroup;
  LOCAL_data :Client;
  selectedCustomer: Client;
  ResultData: any;


  savingCustomer:boolean;

  constructor(private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {
      this.LOCAL_data = data;
    }


  ngOnInit() {
 
  }


   
 save() {

  
       
}

close() {
    this.dialogRef.close({ data: 'close'});
}



}
