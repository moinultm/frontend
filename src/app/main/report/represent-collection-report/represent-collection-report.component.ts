import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@app/core/services/report/product-report.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { StockGeneral } from '@app/shared/models/stock/stock-general.model';
import { UserService } from '@app/core/services/security/user.service';
import { User } from '@app/shared/models/security/user.model';

import { environment } from '@env/environment';
import { ConfigureService } from '@app/core/services/common/config.service';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

@Component({
  selector: 'app-represent-collection-report',
  templateUrl: './represent-collection-report.component.html',
  styleUrls: ['./represent-collection-report.component.scss']
})
export class RepresentCollectionReportComponent implements OnInit {

  data:any;

  userName:string;
  userID:null;
  userAddress:string;

  loading =true;
  loadingUser:Boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  fromDate:any;
  toDate:any;

  users:Array <User>;

  logoPreview: any;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  user:number;
  CanManage:any;
  currentUserID=0;
  isRoleViewAll:any;
  loadingPermission:boolean;

  TotalSales:number;
  TotalExpenses:number;
  TotalPayments:number;


  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private userService:UserService,
    public jwtHelper: JwtHelperService,
    private reportService:ProductReportService,
    private configure:ConfigureService)	{
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
      this.CanManage= this.jwtHelper.hasRole('ROLE_MANAGER_PRIVILEGE');
    }

    setConfig(configure: string) {
      return this.configure.use(configure);
     }

    ngOnInit(){
      this.logoPreview = environment.uploads_url + 'site/';
      this.user=parseInt (this.jwtHelper.id());

      if (this.CanManage)
      {
        this.CanManage=true;
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
      this.loadingPermission=true;
    }

      this.iniForm();

    }


    loadUser(): void {
      this.loadingUser = true;
      this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
        this.users = res.data;
        //console.log(this.users)

         this.loadingUser = false;
      });
    }

    dateFilter(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
      let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
      let user =this.form.get('userId').value;

      this.fromDate=formDt;
      this.toDate=toDt;

      this.reportService.representativeCollectionReport({
        page: this.page,
        size: this.size,
        from:  formDt,
        to:   toDt,
        userid:user
      }).subscribe((res: PartialList<StockGeneral>) => {
        this.data = res;
        console.log( this.data);
        this.summary();
        this.loading = false;
      });
    }


    loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;

      let formDt ='';
      let toDt = '';

      this.reportService.representativeCollectionReport({
        page: this.page,
        size: this.size,
        from:  formDt,
        to:   toDt
      }).subscribe((res: PartialList<StockGeneral>) => {
        this.data = res;
        console.log( this.data);
        this.summary();
        this.loading = false;
      });
    }


    // [disabled]="form.invalid || loading" and :  new Date() will solve the blank date issue
    iniForm(){
      this.form = this._fb.group({
        fromDate: [  new Date(),  [Validators.required]],
        toDate: [  new Date(),  [Validators.required]],
        userId:[0,[Validators.required]]
      });
    }

    updateUser(ctrl) {
      if (ctrl.selectedIndex - 1 >= 0){
        this.userName= this.users[ctrl.selectedIndex - 1].name,
        this.userAddress= this.users[ctrl.selectedIndex - 1].address
       }
  }


    _CIN(val){
      return parseInt(val);
    }

    _CIP(val){
      return parseInt(val)*-1;
    }



summary(){
  this.TotalSales= this.data.sells.reduce((prev, cur) => parseInt(prev) + parseInt(cur.net_total), 0);
  this.TotalExpenses= this.data.expenses.reduce((prev, cur) => parseInt(prev) + parseInt(cur.amount), 0);
  this.TotalPayments= this.data.payments.reduce((prev, cur) => parseInt(prev) + parseInt(cur.amount), 0);
}



}
