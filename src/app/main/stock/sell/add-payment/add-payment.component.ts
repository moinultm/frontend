import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatPaginator} from "@angular/material";
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { AbstractControl } from '@angular/forms';
import { PaymentService } from '@app/core/services/stock/payment.service';
import { Payment } from '@app/shared/models/stock/payment.model';
import { success, warning } from '@app/core/utils/toastr';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'add-payment',
    templateUrl: './add-payment.component.html'
  })
  export class AddPaymentComponent implements OnInit {

   form: FormGroup;
   formLocalData:SellsInvoice;
   savingPayment:boolean;
   selectedInvoice:SellsInvoice;

    constructor(private _formBuilder: FormBuilder,
      private paymentService:PaymentService,
      private _toastr: ToastrService,
      private dialogRef: MatDialogRef<AddPaymentComponent>,

        @Inject(MAT_DIALOG_DATA) public data : SellsInvoice){
        this.formLocalData=data;
       console.log(data);
        }

    ngOnInit() {
     this.iniForm();
     console.log(this.due());
    }

iniForm( ){
  this.form = this._formBuilder.group({
    payDate:[new Date(),[Validators.nullValidator]],
    amount: ['',  [Validators.required,dueAmountValidator(this.due()), Validators.pattern(/^[.\d]+$/) ]],
    note: ['',  [Validators.required, Validators.maxLength(255)]],
    method: ['',  [Validators.required, Validators.maxLength(255)]]
  });
}


    close() {
        this.dialogRef.close({ data: 'close'});
          }

   save( )
  {

    if (this.form.valid) {
      this.savingPayment = true;
      this.paymentService.save({
        client_id: this.formLocalData['data'][0]['client_id'],
        user_id: this.formLocalData['data'][0]['user_id'],
        amount: this.form.get('amount').value,
        date: this.form.get('payDate').value,
        type: 'credit',
        method: this.form.get('method').value,
        note: this.form.get('note').value,
        reference_no: this.formLocalData['data'][0]['reference_no'],
        invoice_payment:1
    }, false).subscribe((res: Payment) => {
      this.savingPayment = false;
      success('Success!', "Saved", this._toastr);
      this.iniForm();

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


due ():number{
  let paid =this.formLocalData['data'][0]['total_pay'];
  let total =this.formLocalData['data'][0]['net_total'];
   return    (total-paid);

}

  }
  //main class end

  function dueAmountValidator(due: number ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value > due  ) {
            return { 'thisGreaterDue': true };
        }
        return null;
    };
}




//https://www.infragistics.com/community/blogs/b/infragistics/posts/how-to-create-custom-validators-for-angular-reactive-forms

//https://stackoverflow.com/questions/44534938/angular-2-custom-validation-for-numbers-and-decimal-values
