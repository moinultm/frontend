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
import { NgbTimeStringAdapter } from './attendance/NgbTimeAdapter.directive';


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
  ],
  providers: [{provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter}]

})
export class EmployeeModule { }
