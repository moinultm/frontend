import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesComponent } from './profiles.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule, MatProgressSpinnerModule, MatCheckboxModule } from '@angular/material';



const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent
  }
];


@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ]
})
export class ProfilesModule { }
