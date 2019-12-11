import { Injectable } from '@angular/core';
import { DashboardService } from '@app/core/services/common/dashboard.service';
import { Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class DashboardResolver implements Resolve<any> {
   constructor(public dashboardDataService: DashboardService) { }
   resolve() {
      return this.dashboardDataService.getDashboardSummary().pipe(
         catchError((error) => {
            return of('No data');
         })
      )
   }


}
