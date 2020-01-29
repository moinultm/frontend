import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeComponent } from './representative.component';
import { AddStockComponent } from './add-stock/add-stock.component';
 import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { UserSalesListComponent } from './user-sales-list/user-sales-list.component';
import { UserSalesInvoicesComponent } from './user-sales-invoices/user-sales-invoices.component';
import { UserReceiptDetailComponent } from './user-receipt-detail/user-receipt-detail.component';

import { UserResolver } from '@app/core/resolvers/user.resolver';
import { ProductListResolver } from '@app/core/resolvers/productlist.resolver';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/core/utils/format-datepicker';


import { ConfigModule } from '@app/shared/config/config.module';

const routes: Routes = [

  {
    path: '',
    component: RepresentativeComponent
  },

    {
      path: 'add-stock',
      component: AddStockComponent,
      resolve: {
        UserResolver,
        ProductListResolver

      }
    },

    {
      path: 'user-sales-list',
      component: UserSalesListComponent
    },
    {
      path: 'user-sales-invoices',
      component: UserSalesInvoicesComponent
    },

    {
      path: 'receipt-detail/:id',
      component: UserReceiptDetailComponent
    },
];

@NgModule({
  declarations: [RepresentativeComponent, AddStockComponent, UserSalesListComponent, UserSalesInvoicesComponent, UserReceiptDetailComponent],
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
    ConfigModule
  ],
  providers: [UserResolver,ProductListResolver,
    MatDatepickerModule,  {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} ]

})
export class RepresentativeModule { }
