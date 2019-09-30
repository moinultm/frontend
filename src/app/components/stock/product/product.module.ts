import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ProductBarcodeComponent } from './product-barcode/product-barcode.component';
import { GiftProductComponent } from './gift-product/gift-product.component';
import { DamageProductComponent } from './damage-product/damage-product.component';


const routes: Routes = [
  // Roles component
  {path: '',component: ProductComponent },

  {path: 'edit/:id',component: ProductComponent },
  {path: 'manage',component: ManageComponent },
  {path: 'barcode/:id',component: ProductBarcodeComponent },
  {path: 'gift',component: GiftProductComponent },
  {path: 'damage',component: DamageProductComponent },
 

];


@NgModule({
  declarations: [ProductComponent, ManageComponent,ProductBarcodeComponent, GiftProductComponent, DamageProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule
  ],
  exports: [RouterModule]
})
export class ProductModule { }
