import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VatSettingsComponent } from './vat-settings.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';

const routes: Routes = [
  // Roles component
  {
    path: '',
    component: VatSettingsComponent
  }
];


@NgModule({
  declarations: [VatSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VatSettingsModule { }
