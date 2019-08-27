import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ProductComponent } from './product/product.component';


import { MaterialsModule } from '@app/material.module';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: SubCategoryComponent
  }
];


@NgModule({
  declarations: [SubCategoryComponent, ProductComponent],
  imports: [
    MaterialsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,


  ],
  entryComponents:[ProductComponent]
})
export class SubCategoryModule { }
