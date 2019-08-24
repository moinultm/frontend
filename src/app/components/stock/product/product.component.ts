import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/stock/category.service';
import { PartialList } from '@models/common/patial-list.model';
import { Category } from '@models/stock/category.model';
import { Subcategory } from '@models/stock/subcategory.model';
import { SubcategoryService } from '@services/stock/subcategory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '@models/stock/product.model';
import { ParentcategoryService } from '@services/stock/parentcategory.service';
import { ProductService } from '@services/stock/product.service';
import { success, warning } from '@services/core/utils/toastr';
import { error } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categories: Array<Category>;
  loadingCategory: boolean;
  loadingSubcategory: boolean;
  _subcategories :Array <Subcategory>;
  form: FormGroup;
  selectedProduct: Product;
  SelectedCategoryId:number=0;
  deletingProduct:boolean;
  savingProduct:boolean;

  loading: boolean;




  constructor(
    private productService : ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private parentService:ParentcategoryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if( this.route.snapshot.params.id) {

      let id=this.route.snapshot.params.id;
      this.getProduct(id);

    }
    else{  this.initForm(); }
  }

  FillSubcategory(catid:number)
  {
    this.loadingSubcategory=true;
    this.parentService.findParent(catid)
    .subscribe((res: PartialList<Subcategory>) => {
      this._subcategories = res.data;
      this.loadingSubcategory = false;
    });
  }


  FillCategory()
  {
    this.loadingSubcategory=true;
    this.categoryService.find()
    .subscribe((res: PartialList<Category>) => {
      this.categories = res.data;
       this.loadingSubcategory = false;
    });

  }


  getProduct(id: number): void {
    this.productService.findById(id)
      .subscribe(
        (product: Product) => this.initForm(product),
        (err: any) => {  if (err.status === 404) {
          err.error.forEach((e: string) => {
            warning('Warning not getting product!', e, this._toastr);
          });
        } }

      );
  }


  initForm(product?: Product): void {

    if (product) {

      this.selectedProduct = product;
      this.FillCategory();
      this.FillSubcategory(product.category_id);

    } else {
      this.selectedProduct = new Product();
    }

    this.FillCategory();
    this.form = this._fb.group({
      product_name: [ product ? product.name : '',  [Validators.required, Validators.maxLength(255)]  ],
      product_code: [ product ? product.code : this.randcode(),   [Validators.required, Validators.maxLength(255)] ] ,
      product_category: [ product ? product.category_id : '', [Validators.required] ],
      product_subcatrgory: [  product ? product.subcategory_id : '',  [Validators.required]  ],
      product_unit: [  product ? product.unit : '',  [Validators.required]  ],
      product_cost_price:[product ? product.cost_price : '',  [Validators.required]  ],
      product_mrp:[product ? product.mrp : '',  [Validators.required]  ],
      product_minimum_retail_price:[product ? product.minimum_retail_price : '',  [Validators.required]  ],
      product_status:[product ? product.status : '',  [Validators.required]  ],
      product_details:[product ? product.details : '',  [Validators.nullValidator]  ],
      opening_stock:[product ? product.opening_stock : '',  [Validators.nullValidator]  ],

    });


  }


  //Save
 //main Save function
 saveForm(form: any): void {
  if (this.form.valid) {
    this.savingProduct = true;
    this.productService.save({
      id: this.selectedProduct.id,
      full_name: this.form.get('full_name').value,

    }, this.selectedProduct.id ? true : false).subscribe((res: Product) => {
      success('Success!', 'The Product is successfully saved.', this._toastr);
      this.savingProduct = false;
      this.initForm();
    }, (err: any) => {
      if (err.status === 403) {
        err.error.forEach((e: string) => {
          warning('Warning!', e, this._toastr);
        });
      } else {
        error('Error!', 'An error has occured when saving the Product, please contact system administrator.', this._toastr);
      }
      this.savingProduct = false;
    });
  }
}



  randcode(){
    return  Math.floor(100000 + Math.random() * 900000).toString();
  }

     //Delete
     delete(modal: any): void {
      this.deletingProduct = true;
      this.productService.delete({
        id: this.selectedProduct.id
      }).subscribe(() => {
        this.close(modal, true);
        this.deletingProduct = false;
      });
    }


      //Close Module
      close(modal: any, flag?: boolean): void {
        modal.close(flag ? true : false);
      }

}
