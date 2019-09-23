import { Component, OnInit } from '@angular/core';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sells-order.model';

@Component({
  selector: 'app-user-sales-invoices',
  templateUrl: './user-sales-invoices.component.html',
  styleUrls: ['./user-sales-invoices.component.scss']
})
export class UserSalesInvoicesComponent implements OnInit {
  data: PartialList<SellsOrder>;
  loading: boolean;
  savingSubcategory: boolean;
  deletingSubcategory: boolean;

  loadingCategory: boolean;
  page = 1;
  size = 10;


  constructor( private representService: RepresentStockService) { }

  ngOnInit() {
    this.loadData(0);
  }

  //Loading Data
  loadData(id:number,page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.representService.salesInvoices(id,{
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<SellsOrder>) => {
      this.data = res;
      this.loading = false;
    });
  }

}
