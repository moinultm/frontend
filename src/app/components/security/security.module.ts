import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';

// Module routes
const routes: Routes = [
 
  {
    path: 'users',
   loadChildren: './users/users.module#UsersModule'
  },
  // Profiles module
  {
    path: 'profiles',
    loadChildren: './profiles/profiles.module#ProfilesModule'
  },
  // Roles module
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  }
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecurityModule { }
