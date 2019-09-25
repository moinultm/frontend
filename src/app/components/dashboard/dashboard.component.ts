import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../services/common/translate.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {

  }


  constructor(private translate: TranslateService) {


      console.log(translate.data);


  }


  setLang(lang: string) {
    this.translate.use(lang);
  }


  ngOnInit() {

  }

}


//https://medium.com/@DenysVuika/simple-i18n-support-for-your-angular-apps-6138a47eb2a9
