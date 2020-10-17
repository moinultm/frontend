import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesubcategoryComponent } from './expensesubcategory.component';

 import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialsModule } from '@app/material.module';
const routes: Routes = [
  // Roles component
  {
    path: '',
    component: ExpensesubcategoryComponent
  }
];


@NgModule({
  declarations: [ExpensesubcategoryComponent],
  imports: [
    MaterialsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,

  ]
})
export class ExpensesubcategoryModule { }
