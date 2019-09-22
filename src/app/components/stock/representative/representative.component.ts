import { Component, OnInit } from '@angular/core';
import { RepresentStock } from '@models/stock/represent-stock.model';
import { PartialList } from '@models/common/patial-list.model';
import { RepresentStockService } from '@services/stock/represent-stock.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.scss']
})
export class RepresentativeComponent implements OnInit {
  data: PartialList<RepresentStock>;
  loading: boolean;
  savingSubcategory: boolean;
  deletingSubcategory: boolean;

  loadingCategory: boolean;
  page = 1;
  size = 10;


  constructor(  private representService: RepresentStockService,) { }

  ngOnInit() {
    this.loadData();
  }


  //Loading Data
  loadData(page?: number): void {
    this.page = page ? page : 1;
    this.loading = true;
    this.representService.find({
      page: this.page,
      size: this.size
    }).subscribe((res: PartialList<RepresentStock>) => {
      this.data = res;
      this.loading = false;
    });
  }


}
