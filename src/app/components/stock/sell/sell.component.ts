import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sells-order.model';
import { SellsOrderService } from '@services/stock/sells-order.service';
import{TablesDataSource} from '@services/stock/lessons.datasource'
import { fromEvent, merge } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ProductService } from '@services/stock/product.service';
import { UserService } from '@services/security/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
 
  data: PartialList<SellsOrder>;

  loading: boolean;
  savingSles: boolean;
  deletingSales: boolean;
  page = 1;
  size = 10;

  dataSource: TablesDataSource;
  displayedColumns= ["slNo", "referenceNo", "date", "name","total","paid","user","actions"];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input', { static: false }) input: ElementRef;
  route: any;


  constructor(
    private sellsService:SellsOrderService,
    private router:Router,
  ) { }

  ngOnInit() {


    this.loadData();
  }
//Loading Data
loadData(page?: number): void {
  this.page = page ? page : 1;
  this.loading = true;
  this.sellsService.find({
    page: this.page,
    size: this.size
  }).subscribe((res: PartialList<SellsOrder>) => {
    this.data = res;
    console.log();
    this.loading = false;
  });
}

  
searchByInvoiceNo(text:string){
  console.log(text);
}

//Redirection
toDetails(id:number){
  this.router.navigate([`sell/details/${id}`]);
}

refereToNewSell(){
  this.router.navigate(['sell/add']);
}

refereToReturnSell(id:number){
  this.router.navigate([`sell/return/${id}`]);
}


refereToEditInvoice(id:number){

}


}
