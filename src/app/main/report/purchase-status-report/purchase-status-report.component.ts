import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';

@Component({
  selector: 'app-purchase-status-report',
  templateUrl: './purchase-status-report.component.html',
  styleUrls: ['./purchase-status-report.component.scss']
})
export class PurchaseStatusReportComponent implements OnInit {

  data: any;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  fromDate:any;
  toDate:any;


  form: FormGroup;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(  private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService) { }

  ngOnInit() {
    this.iniForm();
    this.loadData();
  }

  dateFilter(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.fromDate=formDt;
    this.toDate=toDt;

    this.reportService.purchaseReport({
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<StockGeneral>) => {
      this.data = res;
      console.log( this.data);
      this.loading = false;
    });
  }


  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;

    let formDt ='';
    let toDt = '';

    this.reportService.purchaseReport({
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<StockGeneral>) => {
      this.data = res;
      console.log( this.data);
      this.loading = false;
    });
  }



  iniForm(){
    this.form = this._fb.group({
      fromDate: [ new Date(),  [Validators.required],],
      toDate: [  new Date(),  [Validators.required],]
    });
  }


  totalPaidAmount (){
    var total = 0;
            for(let count=0;count<this.data.data.length;count++){
                total += parseInt(this.data.data[count].paid,10);
            }
            return total;
  }



  totalAmount (){
    var total = 0;
            for(let count=0;count<this.data.data.length;count++){
                total += parseInt(this.data.data[count].total,10);
            }
            return total;
  }



}
