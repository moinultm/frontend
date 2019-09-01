import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductListComponent } from './product-list/product-list.component';

import { MaterialsModule } from '@app/material.module';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: SubCategoryComponent
  }
];


@NgModule({
  declarations: [SubCategoryComponent, ProductListComponent],
  imports: [
    MaterialsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,


  ],
  entryComponents:[ProductListComponent]
})
export class SubCategoryModule { }
