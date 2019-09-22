import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeComponent } from './representative.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';
import { UserSalesListComponent } from './user-sales-list/user-sales-list.component';

const routes: Routes = [

  {
    path: '',
    component: RepresentativeComponent
  },

    {
      path: 'add-stock',
      component: AddStockComponent
    },

    {
      path: 'add-payment',
      component: AddPaymentComponent
    },

    {
      path: 'user-sales-list',
      component: UserSalesListComponent
    },


];

@NgModule({
  declarations: [RepresentativeComponent, AddStockComponent, AddPaymentComponent, UserSalesListComponent],
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
})
export class RepresentativeModule { }
