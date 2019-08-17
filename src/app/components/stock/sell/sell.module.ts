import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsalesComponent } from './newsales/newsales.component';

const routes: Routes = [
  // Roles component
  {
    path: 'add',
    component: NewsalesComponent
  },
  {
    path: '',
    component: SellComponent
  }

];

@NgModule({
  declarations: [SellComponent, NewsalesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SellModule { }
