import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralSettingsComponent } from './general-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';

const routes: Routes = [
  // Roles component
  {
    path: '',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_SETTINGS_ACCESS' ]
    },
    component: GeneralSettingsComponent
  }
];

@NgModule({
  declarations: [GeneralSettingsComponent],
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
export class GeneralSettingsModule { }
