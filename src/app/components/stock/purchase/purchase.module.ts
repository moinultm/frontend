import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { AddPaymentComponent } from '../purchase/add-payment/add-payment.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { InvoiceBarcodedComponent } from './invoice-barcoded/invoice-barcoded.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxBarcodeModule } from 'ngx-barcode';
const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddPurchaseComponent
  },
  {
    path: '',
    component: PurchaseComponent
  },
  {
    path: 'details/:id',
    component: PurchaseDetailsComponent
  },
  {
    path: 'invoice-barcoded',
    component: InvoiceBarcodedComponent
  },

];


@NgModule({
  declarations: [PurchaseComponent,AddPurchaseComponent,PurchaseDetailsComponent,AddPaymentComponent,AddSupplierComponent, InvoiceBarcodedComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule,
    //materials

    MaterialsModule,
    NgSelectModule
  ],
  entryComponents:[AddPaymentComponent,AddSupplierComponent],
})
export class PurchaseModule { }
