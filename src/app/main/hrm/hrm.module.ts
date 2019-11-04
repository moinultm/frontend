import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialsModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: 'employee',
    canActivate: [ AuthGuard],
   loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
]

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
  ,providers:[DatePipe ]
})
export class HrmModule { }
