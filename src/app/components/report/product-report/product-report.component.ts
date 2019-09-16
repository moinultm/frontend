import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { ProductReportService } from '@services/report/product-report.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrls: ['./product-report.component.scss'],
   
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
    private _fb: FormBuilder,private datePipe : DatePipe) { }

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

  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

  this.categoryService.postProductSummary({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<Product>) => {
    this.data = res;
    this.loading = false;
  });


}

}
