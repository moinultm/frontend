import { Component, OnInit } from '@angular/core';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';

@Component({
  selector: 'app-represent-status-report',
  templateUrl: './represent-status-report.component.html',
  styleUrls: ['./represent-status-report.component.scss']
})
export class RepresentStatusReportComponent implements OnInit {
  data:any;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  fromDate:any;
  toDate:any;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService)	{

  	}

    ngOnInit(){
      this.loadData();
      this.iniForm();
    }

    dateFilter(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
      let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

      this.fromDate=formDt;
      this.toDate=toDt;

      this.reportService.representativePaymentReport({
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

      this.reportService.representativePaymentReport({
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


    // [disabled]="form.invalid || loading" and :  new Date() will solve the blank date issue
    iniForm(){
      this.form = this._fb.group({
        fromDate: [  new Date(),  [Validators.required],],
        toDate: [  new Date(),  [Validators.required],]
      });
    }

    _CIN(val){
      return parseInt(val);
    }

    _CIP(val){
      return parseInt(val)*-1;
    }





}
