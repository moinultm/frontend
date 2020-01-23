import { Component, OnInit } from '@angular/core';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Product } from '@app/shared/models/stock/product.model';
import { ProductReportService } from '@app/core/services/report/product-report.service';
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


  fromDate:any;
  toDate:any;

  //solution for today date
todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');


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
        this.categoryService.postProductReport({
          from:  this.todayDate,
          to:  this.todayDate
        }).subscribe((res: PartialList<Product>) => {
          this.data = res;
          this.loading = false;
        });
      }


iniForm(){
  this.loading=true;
  this.form = this._fb.group({
    fromDate: [  new Date(),  [Validators.required],],
    toDate: [ new Date(),  [Validators.required],]
  });
}


dateFilter(){
  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

  this.fromDate=formDt;
  this.toDate=toDt;

  this.loading = true;
  this.categoryService.postProductReport({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<Product>) => {
    this.data = res;
    console.log(   this.data);
    this.loading = false;
  });

}


_CIN(val){
  return parseInt(val);
}

_CIP(val){
  return parseInt(val)*-1;
}


private getElementTag(tag: keyof HTMLElementTagNameMap): string {
  const html: string[] = [];
  const elements = document.getElementsByTagName(tag);
  for (let index = 0; index < elements.length; index++) {
    html.push(elements[index].outerHTML);
  }
  return html.join('\r\n');
}


  print(printSectionId): void {
    event.preventDefault()
  let printContents, popupWin, styles = "", links = '';



    styles = this.getElementTag('style');
    links = this.getElementTag('link');


  printContents = document.getElementById(printSectionId).innerHTML;
  popupWin = window.open("", "_blank", "top=0,left=0,height=auto,width=auto");
  popupWin.document.open();
  popupWin.document.write(`
    <html>
      <head>
        <title>Report</title>
        ${styles}
        ${links}
        <style>
        @page {
          size: A4 landscape;
        }
      </style>
      </head>
      <body onload="window.print(); setTimeout(()=>{ window.close(); }, 0)">
        ${printContents}
      </body>
    </html>`);
  popupWin.document.close();
}


}
