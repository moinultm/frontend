import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

 import { MaterialsModule } from '@app/material.module';

const routes: Routes = [

  {
    path: '',
    component: SupplierComponent
  }
];



@NgModule({
  declarations: [SupplierComponent,SupplierDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
  ],
  entryComponents:[SupplierDetailsComponent]
})
export class SupplierModule { }
