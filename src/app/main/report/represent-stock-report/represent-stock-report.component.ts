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



  data: PartialList<StockGeneral>;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  loadingUser:boolean;


  form: FormGroup;

  users:PartialList <User>;


  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private reportService:ProductReportService,
    private userService:UserService)	{

  	}

    ngOnInit(){
      this.loadData(0);
      this.loadUser();

      this.iniForm();
    }



    loadUser(): void {
      this.loadingUser = true;
      this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
        this.users = res;
         this.loadingUser = false;
      });
    }




    dateFilter(  page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
      let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
      let id=this.form.get('userId').value;

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






}
