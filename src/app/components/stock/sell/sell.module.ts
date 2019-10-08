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


const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: '',
    component: SellComponent
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
    component: SellsOrderComponent

  },
  {
    path: 'order-list',
    component: OrderListComponent

  }
];

@NgModule({
  declarations: [SellComponent, AddComponent,SellDetailsComponent,AddPaymentComponent,SellReturnComponent,AddCustomerComponent, SellsOrderComponent, OrderListComponent, OrderInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    //materials
    MatDatepickerModule,
    MaterialsModule
    //materials
  ],
  entryComponents:[AddPaymentComponent,AddCustomerComponent],
  providers: [ MatDatepickerModule ],
})
export class SellModule { }
