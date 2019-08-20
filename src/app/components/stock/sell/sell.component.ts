import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { SellsOrderService } from '@services/stock/sellsorder.service';
import{TablesDataSource} from '@services/stock/lessons.datasource'
import { fromEvent, merge } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

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

  displayedColumns= ["seqNo", "description", "duration"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild('input', { static: false }) input: ElementRef;



  constructor(
    private sellsService:SellsOrderService
  ) { }

  ngOnInit() {

    this.dataSource = new TablesDataSource(this.sellsService);

    this.dataSource.loadTables(1, '', 'asc', 1, 3);

    this.loadData()

  }


  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement,'keyup')
        .pipe(
            debounceTime(150),
            distinctUntilChanged(),
            tap(() => {
                this.paginator.pageIndex = 0;

                this.loadLessonsPage();
            })
        )
        .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadLessonsPage())
    )
    .subscribe();

}

loadLessonsPage() {
    this.dataSource.loadTables(
        1,
        this.input.nativeElement.value,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
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
          this.loading = false;
          console.log(this.data.data);
        });
      }




}
