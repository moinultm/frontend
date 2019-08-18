import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsalesComponent } from './newsales/newsales.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
  
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
   
  ],
  providers: [ MatDatepickerModule ],
})
export class SellModule { }
