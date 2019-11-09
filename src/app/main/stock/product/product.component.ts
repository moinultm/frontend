import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@app/core/services/stock/category.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Category } from '@app/shared/models/stock/category.model';
import { Subcategory } from '@app/shared/models/stock/subcategory.model';
import { SubcategoryService } from '@app/core/services/stock/subcategory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '@app/shared/models/stock/product.model';
import { ParentcategoryService } from '@app/core/services/stock/parentcategory.service';
import { ProductService } from '@app/core/services/stock/product.service';
import { success, warning } from '@app/core/utils/toastr';
import { error } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

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
  picturePreview: any;


  constructor(
    private productService : ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private parentService:ParentcategoryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      let id = this.route.snapshot.params.id;
      this.getProduct(id);
    }
    else {
      this.initForm();
    }

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
    this.loading=true;

    this.productService.findById(id)
      .subscribe(
        (product: Product) => {
          this.initForm(product),

          this.loading = false;
        },
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
      opening_stock:[product ? product.opening_stock : '',  [Validators.required]   ],
       image:[product ? product.image : '',  [Validators.nullValidator]  ]
    });


  }


  //Save
 //main Save function
 saveForm(form: any): void {
  if (this.form.valid) {
    this.savingProduct = true;

    const formData = new FormData();
    if (this.selectedProduct.image instanceof File) {
     // formData.append('image', this.selectedProduct.image);
    }

    formData.append('id', this.selectedProduct.id + '');
    formData.append('name', this.form.get('product_name').value);
    formData.append('code', this.form.get('product_code').value);
    formData.append('category_id', this.form.get('product_category').value);
    formData.append('subcategory_id', this.form.get('product_subcatrgory').value);
    formData.append('cost_price', this.form.get('product_cost_price').value);
    formData.append('mrp', this.form.get('product_mrp').value);
    formData.append('minimum_retail_price', this.form.get('product_minimum_retail_price').value);
    formData.append('unit', this.form.get('product_unit').value);
    formData.append('details', this.form.get('product_details').value);
    formData.append('opening_stock', this.form.get('opening_stock').value);
    formData.append('status', this.form.get('product_status').value);


    this.productService.save(formData, this.selectedProduct.id ? true : false).subscribe((res: Product) => {
      success('Success!', 'The Product is successfully saved.', this._toastr);
      this.savingProduct = false;
      this.initForm();
      this.router.navigate(['/product']);
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
    return   Math.floor(100000 + Math.random() * 900000).toString();
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

//Image Processing
    onImageChanged(file): void {
      this.selectedProduct.image = file;
      if (this.selectedProduct && this.selectedProduct.image && this.selectedProduct.image instanceof File) {
        this.previewImage(this.selectedProduct.image);
      } else {
        this.picturePreview = 'assets/images/file-icons/512/006-record.png';
      }
    }

    private previewImage(file: File): void {
      if (file.type.match(/image\/*/) == null) {
        this.picturePreview = 'assets/images/file-icons/512/006-record.png';
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.picturePreview = reader.result;
        };
      }
    }

      //Close Module
      close(modal: any, flag?: boolean): void {
        modal.close(flag ? true : false);
      }

}
