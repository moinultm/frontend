import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MaterialsModule } from '@app/material.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: CustomerComponent
  },
  {path: 'report/:id',component: CustomerReportComponent },
];

@NgModule({
  declarations: [CustomerComponent,
    AddCustomerComponent,
    CustomerReportComponent,
    CustomerDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,

  ],
  entryComponents:[AddCustomerComponent,CustomerDetailsComponent,CustomerReportComponent]
})
export class CustomerModule { }
