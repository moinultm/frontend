import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
      path: '',
      component: LayoutComponent,
      children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
          { path: 'dashboard', loadChildren: () => import('../components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: '', loadChildren: () => import('../components/security/security.module').then(m => m.SecurityModule) },
          { path: '', loadChildren: () => import('../components/stock/stock.module').then(m => m.StockModule) },
          { path: '', loadChildren: () => import('../components/settings/settings.module').then(m => m.SettingsModule) },
          { path: '', loadChildren: () => import('../components/report/report.module').then(m => m.ReportModule) },
 
      ]
  },
  //{ path: '**',  redirectTo: '/dashboard'  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
