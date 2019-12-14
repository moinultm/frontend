import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { InvoiceBarcodedComponent } from './invoice-barcoded/invoice-barcoded.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxBarcodeModule } from 'ngx-barcode';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/core/utils/format-datepicker';

import { PurchaseListResolver } from '@app/core/resolvers/purchaseslist.resolver';
import { SupplierListResolver } from '@app/core/resolvers/supplierlist.resolver';
import { ProductListResolver } from '@app/core/resolvers/productlist.resolver';


const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddPurchaseComponent,
    resolve: {
      ProductListResolver,
      SupplierListResolver
    },
  },
  {
    path: '',
    component: PurchaseComponent,
    resolve: {
      PurchaseListResolver
    },
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
    NgSelectModule,
  ],
  entryComponents:[AddPaymentComponent,AddSupplierComponent],
  providers: [PurchaseListResolver,SupplierListResolver,ProductListResolver,  {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS} ],
})
export class PurchaseModule { }
