import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Invoice } from '@models/stock/invoice.model';
import { AbstractControl } from '@angular/forms';
import { PaymentService } from '@services/stock/payment.service';
import { Payment } from '@models/stock/payment.model';
import { success, warning } from '@services/core/utils/toastr';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html'
  })
  export class AddPaymentComponent implements OnInit {
    form: FormGroup;
   formData:  Invoice ;
   savingPayment:boolean;

   selectedType:Invoice;



    constructor(private _formBuilder: FormBuilder,
      private paymentService:PaymentService,
      private _toastr: ToastrService,
       private dialogRef: MatDialogRef<AddPaymentComponent>,
        @Inject(MAT_DIALOG_DATA) public data){
         
     this.formData=data;
     console.log( this.formData)
        }

    ngOnInit() {
 

     this.iniForm();
    }

iniForm(){

  this.form = this._formBuilder.group({
    amount: ['',  [Validators.required,this.isAmountGreaterThanDue]],
    note: ['',  [Validators.required, Validators.maxLength(255)]],
    method: ['',  [Validators.required, Validators.maxLength(255)]]     
  });

}


    close() {
        this.dialogRef.close({ data: 'close'});
    }
    
   save( )
  {
 
console.log("aaaaaaaaaaaa", this.formData.reference_no)
    if (this.form.valid) {
      this.savingPayment = true;
      this.paymentService.save({
        client_id: this.formData.client_id,
        amount: this.form.get('amount').value,
        type: 'credit',
        method: this.form.get('method').value,
        note: this.form.get('note').value,       
        reference_no: this.formData.reference_no,
        invoice_payment:1
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
 
     isAmountGreaterThanDue(input: FormControl) {
     
      const hasLessThan = input.value > 0;
      return hasLessThan ? null : { needsLessThan: true };
    }


     }


   

 