import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';


// Module routes
const routes: Routes = [
  {
    path: 'product',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_PRODUCT_ACCESS' ]
    },
   loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'category',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_PRODUCT_ACCESS' ]
    },
   loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'subcategory',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_PRODUCT_ACCESS' ]
    },
    loadChildren: () => import('./sub-category/sub-category.module').then(m => m.SubCategoryModule)
  }
  ,
  {
    path: 'customer',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_CLIENT_ACCESS' ]
    },
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  }
  ,
  {
    path: 'supplier',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_CLIENT_ACCESS' ]
    },
    loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule)
  },
  {
    path: 'sell',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_SALES_ACCESS' ]
    },
    loadChildren: () => import('./sell/sell.module').then(m => m.SellModule)
  },
  {
    path: 'purchase',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_PURCHASE_ACCESS' ]
    },
    loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)
  }
  ,
  {
    path: 'warehouse',
    canActivate: [ AuthGuard],
    loadChildren: () => import('./warehouse/warehouse.module').then(m => m.WarehouseModule)
  },
  {
    path: 'expenses',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_EXPENSE_ACCESS' ]
    },
    loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule)
  },
  {
    path: 'representative',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_REPRESENT_ACCESS' ]
    },
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
  ,providers:[DatePipe ]
})
export class StockModule { }
