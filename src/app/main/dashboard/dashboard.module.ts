import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@app/shared/translate/translate.module';
import { ConfigModule} from '@app/shared/config/config.module';
import { DashboardResolver } from '@app/core/resolvers/dashboard.resolver';



@NgModule({
     declarations: [
        DashboardComponent,
    ],
     imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        ChartsModule,
        TranslateModule,
        ConfigModule
    ],
    providers: [
      DashboardResolver
       ]


})

export class DashboardModule {

}
