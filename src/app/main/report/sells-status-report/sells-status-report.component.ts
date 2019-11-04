import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';

@Component({
  selector: 'app-sells-status-report',
  templateUrl: './sells-status-report.component.html',
  styleUrls: ['./sells-status-report.component.scss']
})
export class SellsStatusReportComponent implements OnInit {
  data: any;

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

  constructor(private sellsService:ProductReportService,
    private _fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.iniForm();
       this.loadData();
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = '';
    let toDt = '';

    this.sellsService.sellsStatusReport({
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

  dateFilter(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.fromDate=formDt;
    this.toDate=toDt;

    this.sellsService.sellsStatusReport({
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
      fromDate: [  new Date(),  [Validators.nullValidator],],
      toDate: [   new Date(),  [Validators.nullValidator],]
    });

    //this.fromDate=  this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
   // this.toDate= this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

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


  print(divName): void {
    event.preventDefault()

    let printContents, popupWin;
    printContents = document.getElementById(divName).innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print Selles Report</title>
          <style>
.no-print{display:none;}
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}



printDiv(divName) {


  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;



}

//to minimize time

//npm i ngx-print


}
