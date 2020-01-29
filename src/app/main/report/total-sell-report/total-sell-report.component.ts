import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { UserService } from '@app/core/services/security/user.service';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';

import jQuery from 'jquery';

declare var jQuery:any;
declare var $:any;
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';
import { ConfigureService } from '@app/core/services/common/config.service';

import { environment } from '@env/environment';


@Component({
  selector: 'app-total-sell-report',
  templateUrl: './total-sell-report.component.html',
  styleUrls: ['./total-sell-report.component.scss']
})
export class TotalSellReportComponent implements OnInit {


  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  userName:string;
  userID:null;
  userAddress:string;

  data:any;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  loadingUser:boolean;

  fromDate:any;
  toDate:any;

  form: FormGroup;

  //users:Array <User>;

  user:number;
  logoPreview: any;

  TotalAmount:number;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
private el: ElementRef;
  constructor(@Inject(ElementRef)el: ElementRef,
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService,
    private userService:UserService,
    public jwtHelper: JwtHelperService,
    private configure:ConfigureService
  ) { this.el = el;}

  ngOnInit(){
    this.logoPreview = environment.uploads_url + 'site/';

    this.user=parseInt (this.jwtHelper.id());
   // this.loadData(this.user);
   //this.loadUser();
    this.iniForm();
  }

  setConfig(configure: string) {
    return this.configure.use(configure);
   }

  dateFilter(  page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');


    this.fromDate=formDt;
    this.toDate=toDt;

    this.reportService.stockReport( {
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<StockGeneral>) => {
      this.data = res;
     console.log( this.data);
   // this.loadPivot(this.data);
   this.GetTotal()
      this.loading = false;
    });
  }


  loadData(id:number,page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;

    let formDt ='';
    let toDt = '';

    this.reportService.stockReport({
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<StockGeneral>) => {
      this.data = res;
    console.log( this.data);
    //this.loadPivot(this.data);
    this.GetTotal()
      this.loading = false;
    });
  }


  iniForm(){
    this.loading=true;

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

  CSUM(val){
    let sum=0;
    return sum =+val;
  }

  //***************POVIT TABLE**********************************/
  ngAfterViewInit(){
  }

  loadPivot(data){
    if (!this.el ||
      !this.el.nativeElement ||
      !this.el.nativeElement.children){
          console.log('cant build without element');
          return;
   }

    var container = this.el.nativeElement;
    var inst = jQuery(container);
    var targetElement = inst.find('#output');


    if (!targetElement){
      console.log('cant find the pivot element');
      return;
    }


   while (targetElement.firstChild){
      targetElement.removeChild(targetElement.firstChild);
    }

    console.log(data.crossData)


    $.pivotUtilities.tipsData=data.crossData;

    var utils = $.pivotUtilities;

    var sum = $.pivotUtilities.aggregatorTemplates.sum;
              var numberFormat = $.pivotUtilities.numberFormat;
              var intFormat = numberFormat({digitsAfterDecimal: 0});

              var count = function(data, rowKey, colKey) {
                return {
                  count: 0,
                  push: function(record) { this.count++; },
                  value: function() { return this.count; },
                  format: function(x) { return x; },
               };
              };
         //sum(intFormat)(["OUTWARD"])

        $("#output").pivot(
          utils.tipsData, {
            rows: ["USER_NAME"],
            cols: ["STOCK_ITEM_NAME","TRAN_TYPE"],
            aggregator: sum(intFormat)(["OUTWARD"])
          });


  }

  GetTotal(){
    this.TotalAmount = this.data.charUser.reduce((prev, cur) => parseInt(prev) + parseInt(cur.Amount), 0);

  }



  //PRINT*******************************************************

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

          .page-footer { position: relative !important;}

          @page {
            size: A4 landscape;
            font-size: small;
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
