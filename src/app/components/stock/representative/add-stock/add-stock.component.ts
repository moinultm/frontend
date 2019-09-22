import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { User } from '@models/security/user.model';
import { PartialList } from '@models/common/patial-list.model';
import { UserService } from '@services/security/user.service';
import { Product } from '@models/stock/product.model';
import { ProductService } from '@services/stock/product.service';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { success, error, warning } from '@services/core/utils/toastr';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {
  loading:boolean;
  users:PartialList <User>;
  _productList: Array<Product>;
  loadingProducts:boolean;
  total:number;
  _saving:boolean;
  myForm: FormGroup;
  constructor(    titleService: Title,private _formBuilder: FormBuilder,
    private userService:UserService,
    private productService:ProductService,
    private __StockService: RepresentStockService,
    private _toastr: ToastrService,
  private datePipe : DatePipe

    ) {
    titleService.setTitle('Stock - Represtative Stock'); }

  ngOnInit() {
    this.iniForm();
    this.loadUser();
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

  loadProducts(): void {
    this.loadingProducts = true;
    this.productService.find()
    .subscribe((res: PartialList<Product>) => {
      this._productList = res.data;
      this.loadingProducts = false;
    });
  }



  iniForm( ){
   this.total=0;

    this.myForm = this._formBuilder.group({
      bill_date:'',
      user_id:0,

      companies: this._formBuilder.array([])
    });
    this.loadProducts()
    this.addNewCompany();
  }

  addNewCompany() {
    let control = <FormArray>this.myForm.controls.companies;
    control.push(
      this._formBuilder.group({
        product_id:0,
          quantity: 0,
          add_quantity: [0,[Validators.required, Validators.pattern(/^[.\d]+$/)]],
          mrp:0

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
        quantity:0,
        mrp:0
       });
    }
    else {

   arrayControl.at(index).patchValue({
   quantity:this._productList[ctrl.selectedIndex - 1].quantity,
   mrp:this._productList[ctrl.selectedIndex - 1].mrp
  });
    }
    //this.updateSubTotal();
  }
//Saavestock

viewData(){
 console.log("Reactive Form submitted: ", this.myForm.get('companies').value);

}
saveStock(form: any){

    this._saving=true;
    const formData = new FormData();
    let formDt = this.datePipe.transform(this.myForm.get('bill_date').value, 'yyyy-MM-dd');

    formData.append('user_id', this.myForm.get('user_id').value);
    formData.append('date', formDt);
    formData.append('items', JSON.stringify(this.myForm.get('companies').value));

    this.__StockService.save(formData, false).subscribe((res: RepresentStock) => {
      success('Success!', 'The Order is successfully saved.', this._toastr);
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
        let parsed = parseInt(x.get('add_quantity').value)
        this.total += parsed
       // this.ref.detectChanges()
      });
    })

 }
}

//https://medium.com/sparkles-blog/angular2-building-nested-reactive-forms-7978ecd145e4
