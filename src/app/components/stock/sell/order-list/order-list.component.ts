import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SellsOrderService } from '@services/stock/sells-order.service';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sells-order.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  form: FormGroup;
  data: PartialList<SellsOrder>;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());


  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private sellsService:SellsOrderService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.iniForm();
    this.loadData();
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  '',  [Validators.nullValidator],],
      toDate: [  '',  [Validators.nullValidator],]
    });
  }

  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');

    this.sellsService.find({
      page: this.page,
      size: this.size,
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<SellsOrder>) => {
      this.data = res;
     // console.log(  this.data);
      this.loading = false;
    });
  }


  dateFilter(){
    let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
    let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
    this.loading = true;
    this.sellsService.find({
      from:  formDt,
      to:   toDt
    }).subscribe((res: PartialList<SellsOrder>) => {
      this.data = res;
      this.loading = false;
    });

  }



  //Redirection
toDetails(id:number){
  this.router.navigate([`sell/order-details/${id}`]);
}

makeInvoice(id:number){
  this.router.navigate([`sell/order-invoice/${id}`]);
}


newOrder(){
  this.router.navigate([`sell/order`]);
}


}
