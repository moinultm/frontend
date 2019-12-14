import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule, MatDatepickerModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ProductBarcodeComponent } from './product-barcode/product-barcode.component';
import { GiftProductComponent } from './gift-product/gift-product.component';
import { DamageProductComponent } from './damage-product/damage-product.component';
import { ListGiftComponent } from './gift-product/list-gift/list-gift.component';
import { ListDamageComponent } from './damage-product/list-damage/list-damage.component';

import { TranslateModule } from '@app/shared/translate/translate.module';
import { ConfigModule} from '@app/shared/config/config.module';

import { ProductListResolver } from '@app/core/resolvers/productlist.resolver';
import { CustomerResolver } from '@app/core/resolvers/customer.resolver';
import { UserResolver } from '@app/core/resolvers/user.resolver';

const routes: Routes = [
  // Roles component
  {path: '',component: ProductComponent },
  {path: 'edit/:id',component: ProductComponent },
  {path: 'manage',component: ManageComponent,
  resolve: {
    ProductListResolver,
  }, },
  {path: 'barcode/:id',component: ProductBarcodeComponent },
  {path: 'gift',
  component: GiftProductComponent,
  resolve: {
    CustomerResolver,
    UserResolver,
    ProductListResolver
        }  },
  {path: 'damage',
  component: DamageProductComponent,
  resolve: {
    CustomerResolver,
    UserResolver,
    ProductListResolver
  }
 },
  {path: 'list-damage',component: ListDamageComponent },
  {path: 'list-gift',component: ListGiftComponent },

];


@NgModule({
  declarations: [ProductComponent, ManageComponent,ProductBarcodeComponent, GiftProductComponent, DamageProductComponent, ListGiftComponent, ListDamageComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    NgxBarcodeModule,
    TranslateModule,
    ConfigModule
  ],
  providers: [ProductListResolver,CustomerResolver,UserResolver],

  exports: [RouterModule]
})
export class ProductModule { }
