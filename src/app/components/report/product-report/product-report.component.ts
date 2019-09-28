import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { ProductReportService } from '@services/report/product-report.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private categoryService: ProductReportService,
    private _fb: FormBuilder,private datePipe : DatePipe) { }

  ngOnInit() {

    this.loadData();
    this.iniForm();
  }

      //Loading Data
      loadData(page?: number): void {
        this.loading = true;
        this.categoryService.postProductSummary({
          from:  '',
          to:   ''
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
  this.loading = true;
  this.categoryService.postProductSummary({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<Product>) => {
    this.data = res;
    this.loading = false;
  });

}


_CIN(val){
  return parseInt(val);
}

_CIP(val){
  return parseInt(val)*-1;
}




}
