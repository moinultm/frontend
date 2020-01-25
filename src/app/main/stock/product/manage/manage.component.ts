import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '@app/shared/models/stock/product.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Title } from '@angular/platform-browser';
import { ProductService } from '@app/core/services/stock/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { success, warning, error } from '@app/core/utils/toastr';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

import { constants } from '@env/constants';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  modalOption: NgbModalOptions = {};


  data: any;
  details:PartialList<Product>;
  loadingDetails:boolean;
  loading: boolean;
  savingProduct: boolean;
 updateProduct: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedProduct: Product;

  selectedProductId:number;

  myUpdateForm: FormGroup;

  loadingPermission:boolean;
  currentUserID=0;
  isRoleViewAll:any;

  CanManage:any;

  //https://stackoverflow.com/questions/45467550/angular-2-how-to-sum-column-ngfor

  constructor(private productService: ProductService,
    private _toastr: ToastrService,
    private modalService: NgbModal,
    titleService: Title,
    private _formBuilder: FormBuilder,
    private router:Router,
    private _fb: FormBuilder,
    private actRoute: ActivatedRoute, public jwtHelper: JwtHelperService
    ) {
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.CanManage= this.jwtHelper.hasRole('ROLE_PRODUCT_MANAGE');
      titleService.setTitle(constants.app_name + ' - Product - Management');
      }

  ngOnInit() {
    if (this.CanManage)
    {this.CanManage=true}
     else{ this.CanManage=false}

    //this.loadData();
    this.fillList();
  }

  fillList(){
    this.actRoute.data.subscribe(data => {
      this.data=data.ProductListResolver;
      this.loading = false;
    });
    }


     //Loading Data
     loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      this.productService.find({
        page: this.page,
        size: this.size
      }).subscribe((res: PartialList<Product>) => {
        this.data = res;
      //  console.log( this.data )
        this.loading = false;
      });
    }

//Detail View+++++++++++++++++++++++

initDetailView(modal:any,id:number){
  event.preventDefault();

this.loadDetails(id);
  this.modalService
  .open(modal)
  .result
  .then((result) => {
    if (result) {
     // this.loadDetails(id);
    } else {
      //this.loadDetails(id);
    }
  }, () => {
  //  this.loadDetails(id);
  });
}

loadDetails(id:number): void {
  //this.page = page ? page : 1;
  this.loadingDetails = true;
  this.productService.findDetailsById(id).subscribe((res: PartialList<Product>) => {
    this.details = res;
 //   console.log(this.details);
    this.loadingDetails = false;
  });
}





initUpdate(modal: any,product?: Product,id?:number): void {
  event.preventDefault();

  this.modalOption.backdrop = 'static';
  this.modalOption.keyboard = false;


  this.UpdateForm(product,id);

  // Open the delete confirmation modal
  this.modalService
    .open(modal,this.modalOption)
    .result
    .then((result) => {
      if (result) {
        this.UpdateForm();
        this.loadData();
      }
     }, () => {
      //If the modal is dismissed
     });
}

UpdateForm( product?: Product,id?:number):void{


   if (product) {

    this.selectedProduct = product;
    this.selectedProductId = id;

    this.myUpdateForm = this._fb.group({

       mrp:[product ? product.mrp : '0',  [Validators.required]],
      cost_price:[product ? product.cost_price : '0',  [Validators.required]],
      minimum_retail_price:[product ? product.minimum_retail_price : '0',  [Validators.required]]

     });

  } else {

}

 }



updateValue(){

  this.updateProduct=true;

  this.productService.updatePrice({
    id:  this.selectedProductId,
   mrp: this.myUpdateForm.get('mrp').value,
   cost_price: this.myUpdateForm.get('cost_price').value,
   minimum_retail_price: this.myUpdateForm.get('minimum_retail_price').value,
  })
    .subscribe((data: any) =>   {
      success('Info!', 'Product data updated', this._toastr);

    }, (err: any) => {
      if (err.status === 403) {
        warning('Warning!', err.error.error, this._toastr);
      } else {
        error('Error!', 'An error has occured when updating , please contact system administrator.', this._toastr);
      }

    });


  }





toBarcode(id:number){
  event.preventDefault();
  this.router.navigate([`product/barcode/${id}`]);
}

 //Close Module
 close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}

}
