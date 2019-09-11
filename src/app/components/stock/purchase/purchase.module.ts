import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';


const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddPurchaseComponent
  },
  {
    path: '',
    component: PurchaseComponent
  },

];


@NgModule({
  declarations: [PurchaseComponent,AddPurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    //materials

    MaterialsModule
  ]
})
export class PurchaseModule { }
