import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Product } from '@app/shared/models/stock/product.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-sell-report',
  templateUrl: './product-sell-report.component.html',
  styleUrls: ['./product-sell-report.component.scss']
})
export class ProductSellReportComponent implements OnInit {

  data: PartialList<Product>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedProduct: Product;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(private reportService: ProductReportService,
    titleService: Title,
    private _fb: FormBuilder,
    private datePipe : DatePipe,) {
      titleService.setTitle('Report Product - All');

     }

  ngOnInit() {
    this.iniForm();
    //this.loadData();
  }


//Loading Data
loadData(id?:number,page?: number): void {
  this.loading = true;
  this.reportService.productSellReport({from:'',to:''}
  ).subscribe((res: PartialList<Product>) => {
    this.data = res;
    console.log(this.data)
    this.loading = false;
  });
}




  iniForm(){
    this.form = this._fb.group({
      fromDate: [  new Date(),  [Validators.required],],
      toDate: [  new Date() , [Validators.required],],

    });
  }


  dateFilter(){
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.loading = true;
    this.reportService.productSellReport( {
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<Product>) => {
      this.data = res;
      this.loading = false;
    });
  }


}
