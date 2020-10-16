import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensecategoryComponent } from './expensecategory.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: ExpensecategoryComponent
  }
];

@NgModule({
  declarations: [ExpensecategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExpensecategoryModule { }
