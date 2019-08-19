import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellComponent } from './sell.component';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsalesComponent } from './newsales/newsales.component';
import { MaterialsModule } from '@app/material.module';

import { MatProgressBarModule, MatProgressSpinnerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatCardModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';

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
//materials

    MatDatepickerModule,
    MaterialsModule

//materials


  ],
  providers: [ MatDatepickerModule ],
})
export class SellModule { }
