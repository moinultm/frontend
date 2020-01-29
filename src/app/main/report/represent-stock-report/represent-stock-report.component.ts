import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { Product } from '@app/shared/models/stock/product.model';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { UserService } from '@app/core/services/security/user.service';
import { User } from '@app/shared/models/security/user.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { environment } from '@env/environment';
import { ConfigureService } from '@app/core/services/common/config.service';

@Component({
  selector: 'app-represent-stock-report',
  templateUrl: './represent-stock-report.component.html',
  styleUrls: ['./represent-stock-report.component.scss']
})
export class RepresentStockReportComponent implements OnInit {

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

  logoPreview: any;

  form: FormGroup;

  users:Array <User>;

  user:number;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  CanManage:any;
  currentUserID=0;
  isRoleViewAll:any;
  loadingPermission:boolean;


  OpeningStock=0;
     StockRecived=0;
      TotalValue=0;
        SalesQty=0;
          SalesAmount=0;
            GiftQty=0;
              DamageQty=0;
                InHandQty=0;
                  InHandValue=0;


  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService,
    private userService:UserService,
    public jwtHelper: JwtHelperService,
    private configure:ConfigureService)	{
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
      this.CanManage= this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
  	}

    ngOnInit(){
      this.logoPreview = environment.uploads_url + 'site/';
      this.user=parseInt (this.jwtHelper.id());

      if (this.CanManage)
      {
        this.CanManage=true
        this.loadUser();
      }
       else{
         this.CanManage=false;
        }


    if (this.isRoleViewAll)
    {
      this.loadUser();
    }
    else{
    // this.loadingUser=true;
    this.loadingPermission=true;}


      //this.loadData(this.user);
      this.iniForm();
    }


    setConfig(configure: string) {
      return this.configure.use(configure);
     }

    loadUser(): void {
      this.loadingUser = true;
      this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
        this.users = res.data;
        //console.log(this.users)

         this.loadingUser = false;
      });
    }

    updateUser(ctrl) {
      if (ctrl.selectedIndex - 1 >= 0){
        this.userName= this.users[ctrl.selectedIndex - 1].name,
        this.userAddress= this.users[ctrl.selectedIndex - 1].address
       }
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
        this.summaries();
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



    summaries(){
      let opVal,inVal;


      this.OpeningStock = this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.TRAN_QUANTITY), 0);
      this.StockRecived = this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.INWARD_QUANTITY), 0);

     opVal = this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.TRAN_QUANTITY) * parseInt(cur.ITEM_MRP), 0);
     inVal= this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.INWARD_QUANTITY) * parseInt(cur.ITEM_MRP) , 0);

      this.TotalValue= opVal+ inVal;

      this.SalesQty= this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.OUTWARD_QUANTITY), 0);
      this.SalesAmount= this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.OUTWARD_AMOUNT), 0);

      this.GiftQty= this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.GIFT_QUANTITY), 0);
      this.DamageQty= this.data.product.reduce((prev, cur) => parseInt(prev) + parseInt(cur.DAMAGE_QUANTITY), 0);

      //_CIN(P.TRAN_QUANTITY)+_CIN(P.OUTWARD_QUANTITY) +_CIN(P.GIFT_QUANTITY) +_CIN(P.DAMAGE_QUANTITY)+_CIN(P.INWARD_QUANTITY)
      this.InHandQty=this.OpeningStock + this.StockRecived+this.SalesQty+this.GiftQty+this.DamageQty;

      //( _CIN(P.TRAN_QUANTITY)+_CIN(P.OUTWARD_QUANTITY) +_CIN(P.GIFT_QUANTITY) +_CIN(P.DAMAGE_QUANTITY)+_CIN(P.INWARD_QUANTITY) ) *  P.ITEM_MRP

      this.InHandValue= this.data.product.reduce((prev, cur) => parseInt(prev) + (parseInt(cur.TRAN_QUANTITY)+parseInt(cur.OUTWARD_QUANTITY)+parseInt(cur.GIFT_QUANTITY)+parseInt(cur.DAMAGE_QUANTITY)+parseInt(cur.INWARD_QUANTITY)) *parseInt(cur.ITEM_MRP), 0);



    }



//==============================Print=======================


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
            body{zoom: 85%;}

            @page {
              size: A4 landscape;
              font-size:small !Important;
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
