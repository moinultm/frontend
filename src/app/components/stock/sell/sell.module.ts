import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { MaterialsModule } from '@app/material.module';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { SellDetailsComponent } from './sell-details/sell-details.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SellReturnComponent } from './sell-return/sell-return.component';


const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: '',
    component: SellComponent
  },
  {
    path: 'details/:id',
    component: SellDetailsComponent

  },
  {
    path: 'return/:id',
    component: SellReturnComponent

  }
];

@NgModule({
  declarations: [SellComponent, AddComponent,SellDetailsComponent,AddPaymentComponent,SellReturnComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    //materials
    MatDatepickerModule,
    MaterialsModule
    //materials
  ],
  entryComponents:[AddPaymentComponent],
  providers: [ MatDatepickerModule ],
})
export class SellModule { }
