import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [

  {
      path: '',
      component: LayoutComponent,
      children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
          { path: 'dashboard', loadChildren: () => import('../main/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: '', loadChildren: () => import('../main/security/security.module').then(m => m.SecurityModule) },
          { path: '', loadChildren: () => import('../main/stock/stock.module').then(m => m.StockModule) },
          { path: '', loadChildren: () => import('../main/hrm/hrm.module').then(m => m.HrmModule) },
          { path: '', loadChildren: () => import('../main/settings/settings.module').then(m => m.SettingsModule) },
          { path: '', loadChildren: () => import('../main/report/report.module').then(m => m.ReportModule) },
      ]
  },
  //{ path: '**',  redirectTo: '/dashboard'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
