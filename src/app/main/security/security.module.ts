import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';

// Module routes
const routes: Routes = [
  {
    path: 'users',
    canActivate: [ AuthGuard],
   loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'profiles',
    canActivate: [ AuthGuard],
    loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'roles',
    canActivate: [ AuthGuard],
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
