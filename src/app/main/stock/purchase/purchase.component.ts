import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PurchaseOrder } from '@app/shared/models/stock/purchase-order.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { PurchaseOrderService } from '@app/core/services/stock/purchase-order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  page = 1;
  size = 10;
  form: FormGroup;
  selectedInvoice: PurchaseOrder;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    private purchaseService: PurchaseOrderService,
    private _fb: FormBuilder,
    private datePipe : DatePipe,
     private router:Router) { }

  ngOnInit() {
    this.iniForm();
    this.loadData();
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

}
