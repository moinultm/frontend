import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from './sub-category.component';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule,MatCheckboxModule,MatProgressSpinnerModule  } from '@angular/material';
const routes: Routes = [
  // Roles component
  {
    path: '',
    component: SubCategoryComponent
  }
];


@NgModule({
  declarations: [SubCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubCategoryModule { }
