import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';

import { UserResolver } from '@app/core/resolvers/user.resolver';

const routes: Routes = [

  {
    path: '',
    component: ExpenseComponent,
    resolve: {
      UserResolver,

    },
  }
];


@NgModule({
  declarations: [ExpenseComponent],
  imports: [

    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
  ],
  providers: [UserResolver]
})
export class ExpenseModule { }
