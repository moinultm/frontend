import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { MaterialsModule } from '@app/material.module';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { SellDetailsComponent } from './sell-details/sell-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SellReturnComponent } from './sell-return/sell-return.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { SellsOrderComponent } from './sells-order/sells-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/core/utils/format-datepicker';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

import { CustomerResolver } from '@app/core/resolvers/customer.resolver';
import { UserResolver } from '@app/core/resolvers/user.resolver';
import { SellsListResolver } from '@app/core/resolvers/sellslist.resolver';
import { ProductListResolver } from '@app/core/resolvers/productlist.resolver';

import { ConfigModule } from '@app/shared/config/config.module';

const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddComponent,
    resolve: {
      UserResolver,
      CustomerResolver,
      SellsListResolver,
      ProductListResolver
    },
  },
  {
    path: '',
    component: SellComponent,
    resolve: {
      SellsListResolver,

    },
  },
  {
    path: 'details/:id',
    component: SellDetailsComponent
  },
  {
    path: 'return/:id',
    component: SellReturnComponent
  },
  {
    path: 'order',
    component: SellsOrderComponent,
    resolve: {
      UserResolver,
      CustomerResolver
    },
  },
  {
    path: 'order-list',
    component: OrderListComponent
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'order-invoice/:id',
    component: OrderInvoiceComponent
  }
];

@NgModule({
  declarations: [SellComponent, AddComponent,SellDetailsComponent,AddPaymentComponent,SellReturnComponent,AddCustomerComponent, SellsOrderComponent, OrderListComponent, OrderInvoiceComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    //materials
    MatDatepickerModule,
    MaterialsModule,
    ConfigModule
    //materials
  ],
  entryComponents:[AddPaymentComponent,AddCustomerComponent],
  providers: [UserResolver,CustomerResolver,SellsListResolver,ProductListResolver,
     MatDatepickerModule,  {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} ],

})
export class SellModule { }
