import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '@app/material.module';




// Module routes
const routes: Routes = [
  {
    path: 'settings/general',
   loadChildren: () => import('./general-settings/general-settings.module').then(m => m.GeneralSettingsModule)
  },
  {
    path: 'settings/vat',
   loadChildren: () => import('./vat-settings/vat-settings.module').then(m => m.VatSettingsModule)
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
  ],
  exports: [RouterModule]
})
export class SettingsModule { }
