import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';




// Module routes
const routes: Routes = [
  {
    path: 'product',
   loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'category',
   loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'subcategory',
    loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule)
  }
  ,
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  }
  ,
  {
    path: 'supplier',
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./sell/sell.module').then(m => m.SellModule)
  },
  {
    path: 'purchase',
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
  }
  ,
  {
    path: 'warehouse',
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule)
  },
  {
    path: 'expenses',
    loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule)
  },
  {
    path: 'representative',
    loadChildren: () => import('./representative/representative.module').then(m => m.RepresentativeModule)
  }

];


@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
  ],
  exports: [RouterModule]
})
export class StockModule { }
