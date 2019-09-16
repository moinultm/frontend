import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { ReportMenuComponent } from './report-menu/report-menu.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [

  {
    path: 'report',
    component: ReportMenuComponent
  },
    {
      path: 'stock-report',
      component: StockReportComponent
    }
    ,
    {
      path: 'product-report',
      component: ProductReportComponent
    }

];

@NgModule({
  declarations: [  ReportMenuComponent, StockReportComponent, ProductReportComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ReportModule { }
