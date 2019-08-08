import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule,MatCheckboxModule,MatProgressSpinnerModule  } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class UsersModule { }
