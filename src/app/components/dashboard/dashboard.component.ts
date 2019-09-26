import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/common/translate.service';
import { Dashboard } from '@models/common/dashboard.model';
import { PartialList } from '@models/common/patial-list.model';
import { DashboardService } from '@services/common/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: PartialList<Dashboard>;
  loading: boolean;

//general chart
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  //barchart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels :  string[]= []  ;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];


  onChartClick(event) {

  }


  constructor(private translate: TranslateService,
    private dashboard:DashboardService) {

  }



  ngOnInit() {
    this.loadData();
   
    console.log(this.data['todays_stats']);
  }
   //Load Data
   loadData() {
    this.loading = true;
    this.dashboard.find().subscribe((res: PartialList<Dashboard>) => {
      this.data = res;  
         
     this.loading = false;
    });
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }


}


//https://medium.com/@DenysVuika/simple-i18n-support-for-your-angular-apps-6138a47eb2a9
