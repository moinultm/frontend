import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {
    path: '',
    component: SupplierComponent
  }
];



@NgModule({
  declarations: [SupplierComponent],
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
export class SupplierModule { }
