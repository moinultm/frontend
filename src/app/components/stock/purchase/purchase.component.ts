import { Component, OnInit } from '@angular/core';
import { PurchaseOrder } from '@models/stock/purchase-order.model';
import { PartialList } from '@models/common/patial-list.model';
import { FormGroup } from '@angular/forms';
import { PurchaseOrderService } from '@services/stock/purchase-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
 

  data: PartialList<PurchaseOrder>;
  loading: boolean;
  savingSupplier: boolean;
  deletingSupplier: boolean;
  page = 1;
  size = 10;
  form: FormGroup;
  selectedInvoice: PurchaseOrder;


  constructor( private purchaseService: PurchaseOrderService,  private router:Router,) { }

  ngOnInit() {
    this.loadData()
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
 
toDetails(id:number){
  this.router.navigate([`purchase/details/${id}`]);
}


}
