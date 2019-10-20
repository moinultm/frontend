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

  sellChartData :any[] = [] ;

  chartLabels :any[]=[];

  //barchart
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels :  string[]= []  ;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData:  any[] = [] ;

  onChartClick(event) {

  }


  constructor(private translate: TranslateService,
    private dashboard:DashboardService) {

  }



  ngOnInit() {
    this.loadData();
   
    //console.log(this.data['data']);

  }
   //Load Data
   loadData() {
   
    this.loading = true;
    this.dashboard.find().subscribe((res: PartialList<Dashboard>) => {
      this.data = res;


 this.barChartLabels=  this.data['top_product_name']; 
 this.barChartData.push({  data:this.data['selling_quantity']  ,  label: 'Quantity Sold'});

this.chartLabels= this.data['months']; 
this.sellChartData.push(
  { data:this.data['sells']  ,  label: 'Sales Value'},
  { data:this.data['purchases']  ,  label: 'Purchase Value'});
 
 
     this.loading = false;
    });
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }


}


//https://medium.com/@DenysVuika/simple-i18n-support-for-your-angular-apps-6138a47eb2a9
