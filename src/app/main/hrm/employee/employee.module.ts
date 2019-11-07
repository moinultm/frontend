import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance/attendance.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';
import { AddNewComponent } from './attendance/add-new/add-new.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';

import { AttendanceReportComponent } from './attendance-report/attendance-report.component';


import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '@app/core/utils/format-datepicker';
import { NgbTimeStringAdapter } from './attendance/NgbTimeAdapter.directive';
import { NgxPrintModule } from 'ngx-print';

const routes: Routes = [
  {    path: 'attendance',    component: AttendanceComponent  },
  {    path: 'notice-board',    component: NoticeBoardComponent  },
  {    path: 'attendance-report',    component: AttendanceReportComponent  }
];


@NgModule({
  declarations: [AttendanceComponent, AddNewComponent,  NoticeBoardComponent,  AttendanceReportComponent],
  imports: [

    CommonModule,
    RouterModule.forChild(routes),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    NgxPrintModule
  ],
  providers: [
  {provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]

})
export class EmployeeModule { }
