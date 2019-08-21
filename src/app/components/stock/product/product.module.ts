import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';


const routes: Routes = [
  // Roles component
  {path: '',component: ProductComponent },

  {path: 'edit/:id',component: ProductComponent },
  {path: 'manage',component: ManageComponent },
];


@NgModule({
  declarations: [ProductComponent, ManageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class ProductModule { }
