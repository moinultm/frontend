 import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/core/services/stock/product.service';
import { Product } from '@app/shared/models/stock/product.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '@app/core/services/security/user.service';
import { RepresentStockService } from '@app/core/services/stock/represent-stock.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { User } from '@app/shared/models/security/user.model';
import { success, warning, error } from '@app/core/utils/toastr';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { Client } from '@app/shared/models/stock/client.model';
import { GiftService } from '@app/core/services/stock/gift.service';
import { Expense } from '@app/shared/models/stock/expense.model';
import { ActivatedRoute } from '@angular/router';
import { ExpenseItem } from '@app/shared/models/stock/expenseitem.model';
import { ExpenseItemService } from '@app/core/services/stock/expenseitem.service';
import { ExpenseService } from '@app/core/services/stock/expense.service';
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  _expenseList:any;
  loading:boolean;


  users:any;

  loadingProducts:boolean;
  total:number;
  _saving:boolean;
  myForm: FormGroup;
  customerList: Client[];

  constructor(
    titleService: Title,private _formBuilder: FormBuilder,
    private userService:UserService,
    private __productService:ExpenseItemService,
    private customeService:CustomerService,
    private __giftService:ExpenseService,
    private _toastr: ToastrService,
  private datePipe : DatePipe,
  private actRoute: ActivatedRoute) {   titleService.setTitle('Account-Transaction'); }

  ngOnInit() {
    this.iniForm();
    this.fillCustomer();
    this.fillUser();
    this.fillProduct();
  }


  fillCustomer(){
    this.actRoute.data.subscribe(data => {
      this.customerList=data.CustomerResolver.data;
      this.loading = false;
    });
    }

    fillUser(){
      this.actRoute.data.subscribe(data => {
        this.users=data.UserResolver;
        this.loading = false;
       // console.log(data.UserResolver.data)
      });
    }

    fillProduct(){
      this.actRoute.data.subscribe(data => {
        this._expenseList=data.ExpenseListResolver.data;
        this.loading = false;
    // console.log(data.ProductListResolver.data)
      });
    }



 loadProducts()
{
  this.loading=true;
  this.__productService.listProduct()
  .subscribe((res: PartialList<ExpenseItem>) => {
    this._expenseList = res.data;
     this.loading = false;
  });
}

  //Load Data
  loadUser(): void {
    this.loading = true;
    this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
      this.users = res;
       //console.log( this.users);
      this.loading = false;
    });
  }



  iniForm(){

    this.total=0;
     this.myForm = this._formBuilder.group({

      bill_date: [new Date(), [Validators.required]],
      user_id:[null,Validators.required],
      purpose:[null,Validators.nullValidator],
      transaction:[null,Validators.required],
      payment_by:[null,Validators.required],
      payment_details:[null,Validators.nullValidator],
      amont:[null,Validators.required],
       companies: this._formBuilder.array([])
     });
    // this.loadUser();
    // this.loadProducts();
     this.fillCustomer();
     this.addNewCompany();
   }

   addNewCompany() {
     let control = <FormArray>this.myForm.controls.companies;
     control.push(
       this._formBuilder.group({  
        expense_id:[null,Validators.required],
         details: 'N/A',
           quantity: [0,[Validators.required, Validators.pattern(/^[.\d]+$/)]],        
       })
     )
   }

   deleteCompany(index) {
     let control = <FormArray>this.myForm.controls.companies;
     control.removeAt(index)
   }



 get employees(): FormArray {
   return this.myForm.get('companies') as FormArray;
 }

 
 //Saavestock

 viewData(){
 // console.log("Reactive Form submitted: ", this.myForm.get('companies').value);

 }
 saveGift(form: any){

     this._saving=true;
     const formData = new FormData();
     let formDt = this.datePipe.transform(this.myForm.get('bill_date').value, 'yyyy-MM-dd');

  
     
     formData.append('transaction', this.myForm.get('transaction').value);
    
     formData.append('payment_by', this.myForm.get('payment_by').value);
     formData.append('payment_details', this.myForm.get('payment_details').value);

      formData.append('date', formDt);
     formData.append('user_id', this.myForm.get('user_id').value);
     formData.append('purpose', this.myForm.get('purpose').value);
 
     
     formData.append('items', JSON.stringify(this.myForm.get('companies').value));

     this.__giftService.save(formData, false).subscribe((res: Expense) => {
       success('Success!', 'The Expense items are successfully saved.', this._toastr);
       this.iniForm();
       this._saving = false;
     }, (err: any) => {
       if (err.status === 403) {
         err.error.forEach((e: string) => {
           warning('Warning!', e, this._toastr);
         });
       } else {

         error('Error!', 'An error has occured when saving the user, please contact system administrator.', this._toastr);
       }
       this._saving = false;
     });
   console.log("Reactive Form submitted: ", this.myForm);
 }


  summaryQty(){
   this.myForm.get('companies').valueChanges.subscribe(values => {
     this.total = 0;
     const ctrl = <FormArray>this.myForm.controls['companies'];
       ctrl.controls.forEach(x => {
         let parsed = parseInt(x.get('quantity').value)
         this.total += parsed
        // this.ref.detectChanges()
       });
     })

  }


}
