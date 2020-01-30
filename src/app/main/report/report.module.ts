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
import { ChallanProductReportComponent } from './challan-product-report/challan-product-report.component';
import { DamageProductReportComponent } from './damage-product-report/damage-product-report.component';
import { GiftProductReportComponent } from './gift-product-report/gift-product-report.component';
import { MonthlySalesReportComponent } from './monthly-sales-report/monthly-sales-report.component';
import { StockInReportComponent } from './stock-in-report/stock-in-report.component';
import { StockOutReportComponent } from './stock-out-report/stock-out-report.component';
import { TotalSellReportComponent } from './total-sell-report/total-sell-report.component';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';
import { ConfigModule } from '@app/shared/config/config.module';
import { RepresentCollectionReportComponent } from './represent-collection-report/represent-collection-report.component';

const routes: Routes = [

  {
    path: 'report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: ReportMenuComponent
  },
    {
      path: 'stock-report',
      canActivate: [ AuthGuard,RoleGuard],
      data: {
        expectedRolesType: 'any',
        expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
      },
      component: StockReportComponent
    }
    ,
    {
      path: 'product-report',
      canActivate: [ AuthGuard,RoleGuard],
      data: {
        expectedRolesType: 'any',
        expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
      },
      component: ProductReportComponent
    },

   //stock-general-report
   { path: 'stock-general-report',
   canActivate: [ AuthGuard,RoleGuard],
   data: {
     expectedRolesType: 'any',
     expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
   },
   component: StockGeneralReportComponent
   },

    //represent
    { path: 'represent-stock-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPRESENT_ACCESS' ]
    },
    component: RepresentStockReportComponent
    },
    { path: 'represent-status-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: RepresentStatusReportComponent
    },
    { path: 'represent-collection-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: RepresentCollectionReportComponent
    },

    //Supplier
    { path: 'supplier-bill-summary',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: SupplierBillSummaryComponent
    },

    //product
    { path: 'product-sell-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: ProductSellReportComponent
    },
    //sells status report

    { path: 'sells-status-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: SellsStatusReportComponent
    },
    { path: 'purchase-status-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: PurchaseStatusReportComponent
    },

    { path: 'transaction-status-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: TransactionStatusReportComponent
    },


    { path: 'profit-loss-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: ProfitLossReportComponent
    },

    { path: 'challan-product-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: ChallanProductReportComponent
    },
    { path: 'damage-product-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component:DamageProductReportComponent
    },
    { path: 'gift-product-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: GiftProductReportComponent
    },
    { path: 'total-sell-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: TotalSellReportComponent
    },
    { path: 'stock-in-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: StockInReportComponent
    },

    { path: 'stock-out-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: StockOutReportComponent
    },

    { path: 'monthly-sales-report',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPORT_ACCESS' ]
    },
    component: MonthlySalesReportComponent
    },

];

@NgModule({
  declarations: [  ReportMenuComponent, StockReportComponent, ProductReportComponent, DailySalesReportComponent, CustomerSummaryReportComponent, RepresentStockReportComponent, RepresentStockSummaryComponent, RepresentStatusReportComponent, SupplierBillSummaryComponent, ProductSellReportComponent, SellsStatusReportComponent, TransactionStatusReportComponent, PurchaseStatusReportComponent, StockGeneralReportComponent, ProfitLossReportComponent, ChallanProductReportComponent, DamageProductReportComponent, GiftProductReportComponent, MonthlySalesReportComponent, StockInReportComponent, StockOutReportComponent, TotalSellReportComponent, RepresentCollectionReportComponent ],
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
    NgxPrintModule,
    ConfigModule
  ]
  ,providers:[DatePipe,  {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} ]

})
export class ReportModule { }
