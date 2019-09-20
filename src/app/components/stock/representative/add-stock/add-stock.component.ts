import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { User } from '@models/security/user.model';
import { PartialList } from '@models/common/patial-list.model';
import { UserService } from '@services/security/user.service';
import { Product } from '@models/stock/product.model';
import { ProductService } from '@services/stock/product.service';

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
  
  myForm: FormGroup;
  constructor(    titleService: Title,private _formBuilder: FormBuilder,
    private userService:UserService,
    private productService:ProductService,
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
       console.log( this.users);
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
        product_name:0,
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
  
/*
  setCompanies() {
    let control = <FormArray>this.myForm.controls.companies;
    this.data.companies.forEach(x => {
      control.push(this.fb.group({ 
         product_name: 0,
        quantity:0,
        mrp:0}))
    })
  }
*/

  //other function
  updatePrice(ctrl) {
    let control = <FormArray>this.myForm.controls.companies;
         this._formBuilder.group({ 
         
        quantity:11,
        mrp:1
      }) 
   


    if (ctrl.selectedIndex == 0) {
      this.myForm.patchValue({
        companies:  this._formBuilder.group([{
          quantity:1,
          mrp:1
        }
        ]),
        product_name: 0,
        
     });
    }
    else {
      this.myForm.patchValue({
        companies:  this._formBuilder.group([{
          quantity:1,
          mrp:1
        }
        ]),
        //name:this._productList[ctrl.selectedIndex - 1].name ,
 
    
           });

    }
    //this.updateSubTotal();
  }


}
