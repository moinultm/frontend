import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-status-report',
  templateUrl: './transaction-status-report.component.html',
  styleUrls: ['./transaction-status-report.component.scss']
})
export class TransactionStatusReportComponent implements OnInit {
  data: any;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  constructor(private sellsService:ProductReportService,
    private _fb: FormBuilder,
    private datePipe : DatePipe) { }

  ngOnInit() {
    this.iniForm();
  }




  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.sellsService.sellsStatusReport({
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<any>) => {
      this.data = res;
      //console.log( this.data);
      this.loading = false;
    });
  }

  iniForm(){
    this.form = this._fb.group({
      fromDate: [  '',  [Validators.nullValidator],],
      toDate: [  '',  [Validators.nullValidator],]
    });
  }





  print(): void {
    event.preventDefault()

    let printContents, popupWin;
    printContents = document.getElementById('printableArea').innerHTML;
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

}
