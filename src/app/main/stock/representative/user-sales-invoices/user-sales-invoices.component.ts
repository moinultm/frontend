import { Component, OnInit } from '@angular/core';
import { RepresentStockService } from '@app/core/services/stock/represent-stock.service';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { SellsInvoice } from '@app/shared/models/stock/invoice.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@app/core/services/security/jwt-helper.service';

@Component({
  selector: 'app-user-sales-invoices',
  templateUrl: './user-sales-invoices.component.html',
  styleUrls: ['./user-sales-invoices.component.scss']
})
export class UserSalesInvoicesComponent implements OnInit {
  data: PartialList<SellsInvoice>;
  loading: boolean;
  savingSubcategory: boolean;
  deletingSubcategory: boolean;

  loadingCategory: boolean;
  page = 1;
  size = 10;

  currentUserID=0;

  constructor(
    public jwtHelper: JwtHelperService,
    private representService: RepresentStockService,
    private router:Router) {
    this.currentUserID=parseInt(this.jwtHelper.id());
  }

  ngOnInit() {
    let uid =this.currentUserID;
    this.loadData(uid);
  }

  //Loading Data
  loadData(id:number,page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.representService.salesInvoices(id,{
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<SellsInvoice>) => {
      this.data = res;
      this.loading = false;
    });
  }

  _CIN(val){
    return parseInt(val);
  }

  toDetails(id:number){
    this.router.navigate([`sell/details/${id}`]);
  }
}
