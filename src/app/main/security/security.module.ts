import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// Module routes
const routes: Routes = [
  {
    path: 'users',
   loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class SecurityModule {
}
