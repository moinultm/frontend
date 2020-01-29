import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { UserService } from '@app/core/services/security/user.service';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';
import { User } from '@app/shared/models/security/user.model';

import { environment } from '@env/environment';
import { ConfigureService } from '@app/core/services/common/config.service';

@Component({
  selector: 'app-challan-product-report',
  templateUrl: './challan-product-report.component.html',
  styleUrls: ['./challan-product-report.component.scss']
})
export class ChallanProductReportComponent implements OnInit {

  todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  userName:string;
  userID:null;
  userIDSelected:number;

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

  logoPreview: any;

  currentUserID=0;
  user:number;
  isRoleViewAll:any;
  CanManage:any;
  loadingPermission:boolean;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor( private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService,
    private userService:UserService,
    public jwtHelper: JwtHelperService,
      private configure:ConfigureService) {
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
     }

  ngOnInit() {
    this.logoPreview = environment.uploads_url + 'site/';
    this.user=parseInt (this.jwtHelper.id());
    // this.loadData(this.user);

     if (this.isRoleViewAll)
     {this.loadUser();}
    else{
    this.loadingPermission=true;}

  this.loadUser();
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


  loadData(id:number,page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;

    let formDt ='';
    let toDt = '';

    this.reportService.challanReport(id,{
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

  dateFilter(uid?:number,  page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    let id;

    //console.log(uid);

    if (!uid){
      id=this.form.get('userId').value;
    }
    else{
      id=uid;
    }


    this.fromDate=formDt;
    this.toDate=toDt;

    this.reportService.challanReport(id, {
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
      userId:[   this.user,  [Validators.required]]
    });
  }

  _CIN(val){
    return parseInt(val);
  }

  _CIP(val){
    return parseInt(val)*-1;
  }

  updateUser(ctrl) {
 if (ctrl.selectedIndex - 1 >= 0){
  this.userIDSelected= this.users[ctrl.selectedIndex - 1].id,
  this.userName= this.users[ctrl.selectedIndex - 1].name,
  this.userAddress= this.users[ctrl.selectedIndex - 1].address
 }
 }



  //PRINT*******************************************************//

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
          body
          {

          }

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
