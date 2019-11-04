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
import { success, warning, error } from '@app/core/services/core/utils/toastr';
import { CustomerService } from '@app/core/services/stock/customer.service';
import { Client } from '@app/shared/models/stock/client.model';
import { GiftService } from '@app/core/services/stock/gift.service';
import { Gift } from '@app/shared/models/stock/gift.model';

@Component({
  selector: 'app-gift-product',
  templateUrl: './gift-product.component.html',
  styleUrls: ['./gift-product.component.scss']
})
export class GiftProductComponent implements OnInit {


  _productList: Array<Product>;
  loading:boolean;
  _users:PartialList <User>;

  loadingProducts:boolean;
  total:number;
  _saving:boolean;
  myForm: FormGroup;
  customerList: Client[];

  constructor(
    titleService: Title,private _formBuilder: FormBuilder,
    private userService:UserService,
    private __productService:ProductService,
    private customeService:CustomerService,
    private __giftService:GiftService,
    private _toastr: ToastrService,
  private datePipe : DatePipe) {   titleService.setTitle('Stock - Gift Product'); }

  ngOnInit() {
    this.iniForm();
  }


 loadProducts()
{
  this.loading=true;
  this.__productService.listProduct()
  .subscribe((res: PartialList<Product>) => {
    this._productList = res.data;
     this.loading = false;
  });
}

  //Load Data
  loadUser(): void {
    this.loading = true;
    this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
      this._users = res;
       //console.log( this.users);
      this.loading = false;
    });
  }



  fillCustomer()
  {
    this.loading=true;
    this.customeService.findCustomer()
    .subscribe((res: PartialList<Client>) => {
      this.customerList = res.data;
       this.loading = false;
    });
  }


  iniForm(){

    this.total=0;
     this.myForm = this._formBuilder.group({

      bill_date: [new Date(), [Validators.required]],
      user_id:[null,Validators.required],
      customer_id:[null,Validators.required],

       companies: this._formBuilder.array([])
     });
     this.loadUser();
     this.loadProducts();
     this.fillCustomer();
     this.addNewCompany();
   }

   addNewCompany() {
     let control = <FormArray>this.myForm.controls.companies;
     control.push(
       this._formBuilder.group({
         product_id:null,
         bill_date:[new Date(),[Validators.required]],
           stock_quantity: 0,
           quantity: [0,[Validators.required, Validators.pattern(/^[.\d]+$/)]],
           mrp:0,
           cost_price:0

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

   //other function
   updatePrice(ctrl,index) {
      const arrayControl = this.myForm.get('companies') as FormArray;
     if (ctrl.selectedIndex == 0) {
       arrayControl.at(index).patchValue({
        stock_quantity:0,
         mrp:0,
         cost_price:0
        });
     }
     else {

    arrayControl.at(index).patchValue({
      stock_quantity:this._productList[ctrl.selectedIndex - 1].quantity,
    mrp:this._productList[ctrl.selectedIndex - 1].mrp,
    cost_price:this._productList[ctrl.selectedIndex - 1].cost_price
   });
     }
     //this.updateSubTotal();
   }
 //Saavestock

 viewData(){
 // console.log("Reactive Form submitted: ", this.myForm.get('companies').value);

 }
 saveGift(form: any){


     this._saving=true;
     const formData = new FormData();
     let formDt = this.datePipe.transform(this.myForm.get('bill_date').value, 'yyyy-MM-dd');

     formData.append('user_id', this.myForm.get('user_id').value);
     formData.append('customer', this.myForm.get('customer_id').value);
     formData.append('date', formDt);
     formData.append('items', JSON.stringify(this.myForm.get('companies').value));

     this.__giftService.save(formData, false).subscribe((res: Gift) => {
       success('Success!', 'The Gift items are successfully saved.', this._toastr);
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
