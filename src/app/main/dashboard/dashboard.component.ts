import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../core/services/common/translate.service';
import { Dashboard } from '@app/shared/models/common/dashboard.model';
import { PartialList } from '@app/shared/models/common/patial-list.model';
import { DashboardService } from '@app/core/services/common/dashboard.service';

import { SettingsService } from '@app/core/services/common/settings.service';
import { Title } from '@angular/platform-browser';
import { ConfigureService } from '@app/core/services/common/config.service';
import { constants } from '@env/constants';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: any;
  loading: boolean;
  location:any;

  //general chart
  chartOptions = {
    responsive: true
  };

  sellChartData :any[] = [];
  chartLabels :any[]=[];

  settings: any;

  data$: Observable<any>;

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

  title:any;

  constructor(
    private dashboard:DashboardService,
    private locationService :SettingsService,
    private translate: TranslateService,
    private configure:ConfigureService,
    titleService: Title,
    private actRoute: ActivatedRoute
     ) {
      titleService.setTitle(constants.app_name+ '-Dashboard');
  }

  //language and Setttings
  setConfig(configure: string) {
   return this.configure.use(configure);
  }

  setLang(lang: string) {
    this.translate.use(lang);
  }


  ngOnInit() {
     //this.loadData();
     this.preloadData();
  }


  preloadData(){
    this.actRoute.data.subscribe(data => {
       this.data =data.DashboardResolver;
       console.log(this.data);

      this.barChartLabels=  this.data['top_product_name'];
      this.barChartData.push({  data:this.data['selling_quantity']  ,  label: 'Quantity Sold'});
      this.chartLabels= this.data['months'];
      this.sellChartData.push(
        { data:this.data['sells']  ,  label: 'Sales Value'},
        { data:this.data['purchases']  ,  label: 'Purchase Value'});
          this.loading = false;
          });
    }

   //Load Data
   loadData() {
    this.loading = true;
    this.dashboard.find().subscribe((res: PartialList<Dashboard>) => {

      this.data = res;
    //  console.log(this.data);

 this.barChartLabels=  this.data['top_product_name'];
 this.barChartData.push({  data:this.data['selling_quantity']  ,  label: 'Quantity Sold'});

this.chartLabels= this.data['months'];
this.sellChartData.push(
  { data:this.data['sells']  ,  label: 'Sales Value'},
  { data:this.data['purchases']  ,  label: 'Purchase Value'});
     this.loading = false;
    });

  }



getLoc(){
  this.locationService.getPosition().then(pos=>
    {
       console.log(`Positon: ${pos.lng} ${pos.lat}`);
       this.location=`Positon: ${pos.lng} ${pos.lat}`;
    });
  }

}



//https://medium.com/@DenysVuika/simple-i18n-support-for-your-angular-apps-6138a47eb2a9
