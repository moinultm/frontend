import { Component, OnInit } from '@angular/core';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sells-order.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';
import { RepresentStock } from '@models/stock/represent-stock.model';


@Component({
  selector: 'app-user-sales-list',
  templateUrl: './user-sales-list.component.html',
  styleUrls: ['./user-sales-list.component.scss']
})
export class UserSalesListComponent implements OnInit {

data: PartialList<RepresentStock>;
loading: boolean;
savingSubcategory: boolean;
deletingSubcategory: boolean;

loadingCategory: boolean;
page = 1;
size = 10;

  constructor(private representService: RepresentStockService) { }

  ngOnInit() {
    this.loadData();

  }

    //Loading Data
    loadData(page?: number): void {
      this.page = page ? page : 1;
      this.loading = true;
      this.representService.findSells({
        page: this.page,
        size: this.size
      }).subscribe((res: PartialList<RepresentStock>) => {
        this.data = res;
        this.loading = false;
      });
    }


}
