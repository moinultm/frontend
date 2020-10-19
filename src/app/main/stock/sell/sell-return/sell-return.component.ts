import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { ActivatedRoute } from '@angular/router';
import { SellsInvoiceService } from '@app/core/services/stock/sells-invoice.service';
import { Transaction } from '@app/shared/models/stock/transaction.model';
import { MatPrefix } from '@angular/material';
import { success, error, warning } from '@app/core/utils/toastr';

@Component({
  selector: 'app-sell-return',
  templateUrl: './sell-return.component.html'
})


export class SellReturnComponent implements OnInit {

  _saving:boolean;
  loadingDetails:boolean;
  details:PartialList <Transaction> ;
  form: FormGroup;

  myForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private sellsInvoiceSvice:SellsInvoiceService
     ){

    }


  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);

    this.iniForm();
  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsInvoiceSvice.getReturnSellById(id).subscribe((res:PartialList <Transaction>) => {
      this.details = res;
       //console.log( 'ppp',this.details);

       this.setCompanies(res);
      this.loadingDetails = false;
    });
   }



iniForm( ){
  this.myForm = this._formBuilder.group({
    companies: this._formBuilder.array([])
  });

}

setCompanies(datas: PartialList <Transaction>) {
  console.log( 'mmnk',datas.data);
  let control = <FormArray>this.myForm.controls.companies;
  let price=0;

   datas.data.forEach(x => {
     x.sells.forEach( s =>{

       if(s.quantity !=0){
      price=s.sub_total/s.quantity;
       }else{
        price=s.minimum_retail;
       }

      control.push(
        this._formBuilder.group({
          product_name: s.product_name,
          quantity: s.quantity,
          quantity_return: [0,[Validators.required, Validators.pattern(/^[.\d]+$/)]],
          mrp:price
          }));
     })
  })
}


//SaveReturn
  saveReturn(form: any){
   console.log( this.myForm);

  this._saving=true;
  const formData = new FormData();

  formData.append('items', JSON.stringify(this.myForm.get('companies').value));


  this.sellsInvoiceSvice.postReturnSellById(formData).subscribe((res:any) => {

    success('Success!', 'The Invoice is successfully saved.', this._toastr);



    this._saving = false;

  }, (err: any) => {

    if (err.status === 403) {

      err.error.forEach((e: string) => {
        warning('Warning!', e, this._toastr);
      });
      this._saving = false;
    }
       else {
      error('Error!',  err.response.message, this._toastr);
      this._saving = false;
    }
    this._saving = false;
  });

  }



   //only number
   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}


//https://stackblitz.com/edit/angular-dffny7?file=app%2Fapp.component.ts

// Sales return function will be completes after edit/alter implemention 11-9-19
