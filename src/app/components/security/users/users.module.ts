import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersModule { }
