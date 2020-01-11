import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchaseOrder } from '@app/shared/models/stock/purchase-order.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { PurchaseOrderService } from '@app/core/services/stock/purchase-order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  @ViewChild('input', { static: false }) input: ElementRef;
  apiResponse:any;
  isSearching:boolean;
  data: any;
  loading: boolean;

  savingSupplier: boolean;
  deletingSupplier: boolean;
  deletingInvoice:boolean;

  deletingItem:boolean;

  page = 1;
  size = 10;
  form: FormGroup;
  selectedInvoice: PurchaseOrder;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  data$: Observable<any>;

  loadingPermission:boolean;
  currentUserID=0;
  isRoleViewAll:any;
  CanManage:any;


  constructor(
    private purchaseService: PurchaseOrderService,
    private _fb: FormBuilder,
    private datePipe : DatePipe,
     private router:Router,
     private actRoute: ActivatedRoute,
     private modalService: NgbModal,
     public jwtHelper: JwtHelperService) {
      this.currentUserID=parseInt(this.jwtHelper.id());
      this.isRoleViewAll=  this.jwtHelper.hasRole('ROLE_PURCHASE_MANAGE');
      }

  ngOnInit() {
//console.log(this.isRoleViewAll)
    if (this.isRoleViewAll)
    {this.isRoleViewAll=true}
else{
  this.isRoleViewAll=false}

    this.iniForm();
   //this.loadData();
   this.fillList();
  }

fillList(){
  this.actRoute.data.subscribe(data => {
    this.data=data.PurchaseListResolver;
    this.loading = false;
  });
  }

  iniForm(){
    this.form = this._fb.group({
      fromDate: [ new Date(),  [Validators.required],],
      toDate: [  new Date(),  [Validators.required],]
    });
  }


  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.purchaseService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<PurchaseOrder>) => {
      this.data = res;
      this.loading = false;
    });
  }
//refereal


//Search
dateFilter(){
  let formDt = this.datePipe.transform(this.form.get('fromDate').value, 'yyyy-MM-dd');
  let toDt = this.datePipe.transform(this.form.get('toDate').value, 'yyyy-MM-dd');
  this.loading = true;
  this.purchaseService.find({
    from:  formDt,
    to:   toDt
  }).subscribe((res: PartialList<PurchaseOrder>) => {
    this.data = res;
    this.loading = false;
  });

}


toDetails(id:number){
  this.router.navigate([`purchase/details/${id}`]);
}

ngAfterViewInit(){
  fromEvent(this.input.nativeElement, 'keyup').pipe(
    map((event: any) => {
      return event.target.value;
    })
    ,filter(res => res.length > 3)
    ,debounceTime(1000)
    ,distinctUntilChanged()
    ).subscribe((text: Text) => {
      this.isSearching = true;
       this.purchaseService.findByInvoiceNo(text).subscribe((res)=>{
        //console.log('res',res);
        this.loading = false;
        this.data = res;
      },(err)=>{
        this.loading = false;
       // console.log('error',err);
      });


    });
}




initDelete(modal: any, invoice: PurchaseOrder): void {
  this.selectedInvoice = invoice;
  // Open the delete confirmation modal
  this.modalService
    .open(modal)
    .result
    .then((result) => {
      if (result) {
        this.loadData();
      }
      this.selectedInvoice = new PurchaseOrder();
    }, () => {
      // If the modal is dismissed
      this.selectedInvoice = new PurchaseOrder();
    });
}

delete(modal: any): void {
  this.deletingInvoice = true;
  this.purchaseService.delete({
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
