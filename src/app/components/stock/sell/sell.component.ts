import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PartialList } from '@models/common/patial-list.model';
import { SellsOrder } from '@models/stock/sellsorder.model';
import { SellsOrderService } from '@services/stock/sellsorder.service';


@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  data: PartialList<SellsOrder>;

  loading: boolean;
  savingCategory: boolean;
  deletingCategory: boolean;
  page = 1;
  size = 10;


  showFloatingButtons = false;
  expanded = [];
  displayedColumns: string[] = [  'date',	'invoice-no',	'customer',	'net-total',	'paid',	'actions'];

  dataSource = new MatTableDataSource<SellsOrder>(data);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private sellsService:SellsOrderService
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;


    this.loadData()

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

  toggleFloat(i:number) {
    this.expanded[i] = !this.expanded[i];
  }


}

export interface IPLData {
  season: number;
  winner: string;
  runnerUp: string;
  totalTeams: number;
}

/*const data: IPLData[] = [
  {season: 2008, winner: 'Rajasthan Royals', runnerUp: 'Chennai Super Kings', totalTeams: 8},
  {season: 2009, winner: 'Deccan Chargers', runnerUp: 'Royal Challengers Bangalore', totalTeams: 8},
  {season: 2010, winner: 'Chennai Super Kings', runnerUp: 'Mumbai Indians', totalTeams: 8},
  {season: 2011, winner: 'Chennai Super Kings', runnerUp: 'Royal Challengers Bangalore', totalTeams: 10},
  {season: 2012, winner: 'Kolkata Knight Riders', runnerUp: 'Chennai Super Kings', totalTeams: 9},
  {season: 2013, winner: 'Mumbai Indians', runnerUp: 'Chennai Super Kings', totalTeams: 9},
  {season: 2014, winner: 'Kolkata Knight Riders', runnerUp: 'Kings XI Punjab', totalTeams: 8},
  {season: 2015, winner: 'Mumbai Indians', runnerUp: 'Chennai Super Kings', totalTeams: 8},
  {season: 2016, winner: 'Sunrisers Hyderabad', runnerUp: 'Royal Challengers Bangalore', totalTeams: 8},
  {season: 2017, winner: 'Mumbai Indians', runnerUp: 'Rising Pune Supergiant', totalTeams: 8},
  {season: 2018, winner: 'Chennai Super Kings', runnerUp: 'Sunrisers Hyderabad', totalTeams: 8},
  {season: 2019, winner: 'TBD', runnerUp: 'TBD', totalTeams: 8}
];*/
