import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@services/report/product-report.service';
import { UserService } from '@services/security/user.service';
import { User } from '@models/security/user.model';
import { StockGeneral } from '@models/stock/stock-general.model';

@Component({
  selector: 'app-represent-stock-report',
  templateUrl: './represent-stock-report.component.html',
  styleUrls: ['./represent-stock-report.component.scss']
})
export class RepresentStockReportComponent implements OnInit {

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

  users:Array <User>;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService,
    private userService:UserService)	{

  	}

    ngOnInit(){
      //this.loadData(0);
      this.loadUser();

      this.iniForm();
    }



    loadUser(): void {
      this.loadingUser = true;
      this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
        this.users = res.data;
        console.log(this.users)
         this.loadingUser = false;
      });
    }

    updateUser(ctrl) {
     this.userName= this.users[ctrl.selectedIndex - 1].name,
     this.userAddress= this.users[ctrl.selectedIndex - 1].address
  }


    dateFilter(  page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
      let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
      let id=this.form.get('userId').value;



      this.fromDate=formDt;
      this.toDate=toDt;


      this.reportService.representativeStockReport(id,{
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


    loadData(id:number,page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;

      let formDt ='';
      let toDt = '';

      this.reportService.representativeStockReport(id,{
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
      this.loading=true;

      this.form = this._fb.group({
        fromDate: [  new Date(),  [Validators.required],],
        toDate: [  new Date(),  [Validators.required],],
        userId:[ null,  [Validators.required]]
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
