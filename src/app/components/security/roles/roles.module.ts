import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatProgressBarModule
  ],
  exports: [RouterModule]
})
export class RolesModule { }
