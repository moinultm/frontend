import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';


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
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StockModule { }
