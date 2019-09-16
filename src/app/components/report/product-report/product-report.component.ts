import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { ProductReportService } from '@services/report/product-report.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss']
})
export class ProductReportComponent implements OnInit {

  data: PartialList<Product>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;


  constructor(private categoryService: ProductReportService,
    private _fb: FormBuilder,) { }

  ngOnInit() {
    this.loadData()
    this.iniForm()
  }

      //Loading Data
      loadData(page?: number): void {
        this.page = page ? page : 1;
        this.loading = true;
        this.categoryService.postProductSummary({
          page: this.page,
          size: this.size
        }).subscribe((res: PartialList<Product>) => {
          this.data = res;
          this.loading = false;
        });
      }


iniForm(){
  this.form = this._fb.group({
    fromDate: [  '',  [Validators.nullValidator],],
    toDate: [  '',  [Validators.nullValidator],]
  });
}

dateFilter(){


  this.form.get('toDate').value

  this.categoryService.postProductSummary({
    from:   this.form.get('fromDate').value,
    to:   this.form.get('fromDate').value
  }).subscribe((res: PartialList<Product>) => {
    this.data = res;
    this.loading = false;
  });


}

}
