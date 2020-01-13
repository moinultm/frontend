import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SellsOrderService } from '@app/core/services/stock/sells-order.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsOrder } from '@app/shared/models/stock/sells-order.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';
import { OrderItems } from '@app/shared/models/stock/order-items.model ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  data: any;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  loadingPermission:boolean;
  currentUserID=0;
  isRoleViewAll:any;
  deletingItem:boolean;
  selectedInvoice: SellsOrder;
  deletingInvoice:boolean;

  constructor(
    private _fb: FormBuilder,
    private datePipe : DatePipe,
    private sellsService:SellsOrderService,
    private router:Router,
    public jwtHelper: JwtHelperService,
    private modalService: NgbModal
  ) {   this.currentUserID=parseInt(this.jwtHelper.id());
    this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_SALES_MANAGE'); }

  ngOnInit() {
    this.iniForm();
    this.loadData();
  }


  iniForm(){
    this.form = this._fb.group({
      fromDate: [  new Date(),  [Validators.required],],
      toDate: [   new Date(),  [Validators.required],]
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
  event.preventDefault();
  this.router.navigate([`sell/order`]);
}



initDelete(modal: any, invoice: SellsOrder): void {
  this.selectedInvoice = invoice;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();
      }
      this.selectedInvoice = new SellsOrder();
    }, () => {
      // If the modal is dismissed
      this.selectedInvoice = new SellsOrder();
    });
}

delete(modal: any): void {
  this.deletingInvoice = true;
  this.sellsService.deleteOrder({
    id: this.selectedInvoice.id
  }).subscribe(() => {
    this.close(modal, true);
    this.deletingInvoice = false;
  });
}


close(modal: any, flag?: boolean): void {
  modal.close(flag ? true : false);
}



}
