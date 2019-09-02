import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Client } from '@models/stock/client.model';
import { CustomerService } from '@services/stock/customer.service';
import { ToastrService } from 'ngx-toastr';
import { warning } from '@services/core/utils/toastr';
import { PartialList } from '@models/common/patial-list.model';


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

  details:PartialList <Client> ;

  constructor(private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private clientService: CustomerService,
    private dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.LOCAL_data = data;
    }


  ngOnInit() {
   this.loadDetails(this.LOCAL_data);
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



}
