import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PartialList } from '@models/common/patial-list.model';
import { Product } from '@models/stock/product.model';
import { DatePipe } from '@angular/common';
import { ProductReportService } from '@services/report/product-report.service';
import { UserService } from '@services/security/user.service';
import { User } from '@models/security/user.model';

@Component({
  selector: 'app-represent-stock-report',
  templateUrl: './represent-stock-report.component.html',
  styleUrls: ['./represent-stock-report.component.scss']
})
export class RepresentStockReportComponent implements OnInit {

  data: PartialList<Product>;
  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;
  form: FormGroup;

  loadingUser:boolean;
  users:PartialList <User>;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private productReport: ProductReportService,
    private userService:UserService
  ) { }

  ngOnInit() {
    this.iniForm();

    this.loadData(0);

    this.loadUser();
  }

  loadUser(): void {
    this.loadingUser = true;
    this.userService.findRepresentative().subscribe((res: PartialList<User>) => {
      this.users = res;
       this.loadingUser = false;
    });
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  '',  [Validators.required],],
      toDate: [  '',  [Validators.required],],
      userId:[0,[Validators.required]]
    });
  }


  //Loading Data
  loadData(id:number,page?: number): void {
    this.loading = true;
    this.productReport.representStockReport(id,{from:'',to:''}
    ).subscribe((res: PartialList<Product>) => {
      this.data = res;
      this.loading = false;
    });
  }


  dateFilter(){
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
  let id =this.form.get('userId').value
    this.loading = true;
    this.productReport.representStockReport(id,{
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<Product>) => {
      this.data = res;
      this.loading = false;
    });
  }



  _CIN(val){
    return parseInt(val);
  }

  _CIP(val){
    return parseInt(val)*-1;
  }

 changeSelection(id:number){
      //console.log(id)
      this.loadData(id);
    }



}
