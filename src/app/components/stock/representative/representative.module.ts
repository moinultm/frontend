import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeComponent } from './representative.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatProgressSpinnerModule, MatInputModule } from '@angular/material';

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

   
  
];

@NgModule({
  declarations: [RepresentativeComponent, AddStockComponent, AddPaymentComponent],
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
