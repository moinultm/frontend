import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


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
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RolesModule { }
