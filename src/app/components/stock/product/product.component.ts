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
  SelCategoryId:number=0;

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private parentService:ParentcategoryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService) { }

  ngOnInit() {
    this.initForm();
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
    this.loadingCategory=true;
    this.categoryService.find()
    .subscribe((res: PartialList<Category>) => {
      this.categories = res.data;
       this.loadingCategory = false;
    });

  }

  initForm(product?: Product): void {
    if (product) {
      this.selectedProduct =  Object.assign(Product, product);
    } else {
      this.selectedProduct = new Product();
    }

    this.FillCategory();

    this.form = this._fb.group({
      product_name: [
        product ? product.product_name : '',
        [Validators.required, Validators.maxLength(255)]
      ],
      product_code: [    product ? product.code : this.randcode(),   [Validators.required, Validators.maxLength(255)] ] ,
      product_category: [
        product ? product.category_id : '',
          [Validators.required]
      ],
      product_subcatrgory: [  product ? product.subcategory_id : '',  [Validators.required]  ]

    });



  }

randcode(){
  return  Math.floor(100000 + Math.random() * 900000).toString();
}

}
