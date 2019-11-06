import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@app/shared/translate/translate.module';
import { AppConfigService } from '@app/core/services/config/appconfig.service';
import { AppConfigModule } from '@app/appconfig.module';



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
        AppConfigModule
    ],

    providers:[    AppConfigService]
})

export class DashboardModule {

}
