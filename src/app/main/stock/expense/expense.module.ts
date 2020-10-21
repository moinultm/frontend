import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';

import { UserResolver } from '@app/core/resolvers/user.resolver';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ProductListResolver } from '@app/core/resolvers/productlist.resolver';
import { CustomerResolver } from '@app/core/resolvers/customer.resolver';


const routes: Routes = [

  {
    path: '',
    component: ExpenseComponent,
    resolve: {
      UserResolver,

    },

  },

  {
    path: 'add-expense',
    component: AddExpenseComponent,
    resolve: {
      UserResolver,
      CustomerResolver,
      ProductListResolver
    },

  }
];


@NgModule({
  declarations: [ExpenseComponent, AddExpenseComponent],
  imports: [

    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
  ],
  providers: [UserResolver,ProductListResolver,CustomerResolver,UserResolver,]
})
export class ExpenseModule { }
