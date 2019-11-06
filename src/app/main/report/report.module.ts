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
import { SellsStatusReportComponent } from './sells-status-report/sells-status-report.component';
import { TransactionStatusReportComponent } from './transaction-status-report/transaction-status-report.component';
import { PurchaseStatusReportComponent } from './purchase-status-report/purchase-status-report.component';
import { StockGeneralReportComponent } from './stock-general-report/stock-general-report.component';




import { NgxPrintModule } from 'ngx-print';
import { ProfitLossReportComponent } from './profit-loss-report/profit-loss-report.component';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/core/utils/format-datepicker';

const routes: Routes = [

  {
    path: 'report',
    canActivate: [ AuthGuard],
    component: ReportMenuComponent
  },
    {
      path: 'stock-report',
      canActivate: [ AuthGuard],
      component: StockReportComponent
    }
    ,
    {
      path: 'product-report',
      canActivate: [ AuthGuard],
      component: ProductReportComponent
    },

    //represent
    { path: 'represent-stock-report',
    canActivate: [ AuthGuard],
    component: RepresentStockReportComponent
    },
    { path: 'represent-status-report',
    canActivate: [ AuthGuard],
    component: RepresentStatusReportComponent
    },
    { path: 'represent-stock-summary',
    canActivate: [ AuthGuard],
    component: RepresentStockSummaryComponent
    },

    //Supplier
    { path: 'supplier-bill-summary',
    canActivate: [ AuthGuard],
    component: SupplierBillSummaryComponent
    },

    //product
    { path: 'product-sell-report',
    canActivate: [ AuthGuard],
    component: ProductSellReportComponent
    },
    //sells status report

    { path: 'sells-status-report',
    canActivate: [ AuthGuard],
    component: SellsStatusReportComponent
    },
    { path: 'purchase-status-report',
    canActivate: [ AuthGuard],
    component: PurchaseStatusReportComponent
    },

    { path: 'transaction-status-report',
    canActivate: [ AuthGuard],
    component: TransactionStatusReportComponent
    },

    //stock-general-report
    { path: 'stock-general-report',
    canActivate: [ AuthGuard],
    component: StockGeneralReportComponent
    },
    { path: 'profit-loss-report',
    canActivate: [ AuthGuard],
    component: ProfitLossReportComponent
    },



];

@NgModule({
  declarations: [  ReportMenuComponent, StockReportComponent, ProductReportComponent, DailySalesReportComponent, CustomerSummaryReportComponent, RepresentStockReportComponent, RepresentStockSummaryComponent, RepresentStatusReportComponent, SupplierBillSummaryComponent, ProductSellReportComponent, SellsStatusReportComponent, TransactionStatusReportComponent, PurchaseStatusReportComponent, StockGeneralReportComponent, ProfitLossReportComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgxPrintModule
  ]
  ,providers:[DatePipe,  {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} ]

})
export class ReportModule { }
