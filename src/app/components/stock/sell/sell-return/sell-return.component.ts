import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Inject } from '@angular/core';
 
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { ActivatedRoute } from '@angular/router';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import { Transaction } from '@models/stock/transaction.model';

@Component({
  selector: 'app-sell-return',
  templateUrl: './sell-return.component.html'
  
})



export class SellReturnComponent implements OnInit {


  loadingDetails:boolean;
  details:PartialList <Transaction> ;
  form: FormGroup;
  
  data = {
    companies: [{company: "example comany"}]
  }


  myForm: FormGroup;
 

  constructor(private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private sellsService: SellsOrderService,
     ){

    }

    
  ngOnInit() {
    let id=this.route.snapshot.params.id;
    this.ShowBillDetails(id);
   
    this.iniForm();
  }

  ShowBillDetails(id:number){
    this.loadingDetails = true;
    this.sellsService.getReturnSellById(id).subscribe((res:PartialList <Transaction>) => {
      this.details = res;
       console.log( 'ppp',this.details);
       
       this.setCompanies(res);
      this.loadingDetails = false;
    });
   }
   

   
iniForm( ){
  this.myForm = this._formBuilder.group({
    companies: this._formBuilder.array([])
  })


}
 
setCompanies(datas: PartialList <Transaction>) {
console.log( 'mmnk',datas.data);

  let control = <FormArray>this.myForm.controls.companies;
   datas.data.forEach(x => {

     x.sells.forEach( s =>{
      control.push(
        this._formBuilder.group({ 
        company: s.product_name, 
          }));
     })
   
  })
}

addNewCompany() {
  let control = <FormArray>this.myForm.controls.companies;
  control.push(
    this._formBuilder.group({
      company: ['']
     
    })
  )
}

deleteCompany(index) {
  let control = <FormArray>this.myForm.controls.companies;
  control.removeAt(index)
}



  //SaveReturn
  saveReturn(){
    console.log( this.myForm)
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

