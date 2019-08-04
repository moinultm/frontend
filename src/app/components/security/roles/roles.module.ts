import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { Routes, RouterModule } from '@angular/router';

// Module routes
const routes: Routes = [
  // Roles component
  {
    path: '',
    component: RolesComponent
  }
];


@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RolesModule { }
