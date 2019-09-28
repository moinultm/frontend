import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { ReportMenuComponent } from './report-menu/report-menu.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { MatProgressSpinnerModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DailySalesReportComponent } from './daily-sales-report/daily-sales-report.component';
import { CustomerSummaryReportComponent } from './customer-summary-report/customer-summary-report.component';
import { RepresentStockReportComponent } from './represent-stock-report/represent-stock-report.component';
import { RepresentStockSummaryComponent } from './represent-stock-summary/represent-stock-summary.component';
import { RepresentStatusReportComponent } from './represent-status-report/represent-status-report.component';
import { SupplierBillSummaryComponent } from './supplier-bill-summary/supplier-bill-summary.component';
import { ProductSellReportComponent } from './product-sell-report/product-sell-report.component';



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
    },

    //represent
    { path: 'represent-stock-report',
    component: RepresentStockReportComponent
    },
    { path: 'represent-status-report',
    component: RepresentStatusReportComponent
    },
    { path: 'represent-stock-summary',
    component: RepresentStockSummaryComponent
    },

    //Supplier
    { path: 'supplier-bill-summary',
    component: SupplierBillSummaryComponent
    },

    //product
    { path: 'product-sell-report',
    component: ProductSellReportComponent
    },

];

@NgModule({
  declarations: [  ReportMenuComponent, StockReportComponent, ProductReportComponent, DailySalesReportComponent, CustomerSummaryReportComponent, RepresentStockReportComponent, RepresentStockSummaryComponent, RepresentStatusReportComponent, SupplierBillSummaryComponent, ProductSellReportComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule
  ]
  ,providers:[DatePipe ]

})
export class ReportModule { }
