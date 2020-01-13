import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';

// Module routes
const routes: Routes = [
  {
    path: 'users',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_ACL_ACCESS' ]
    },
   loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'profiles',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_ACL_ACCESS' ]
    },
    loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'roles',
    canActivate: [ AuthGuard,RoleGuard],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_ACL_ACCESS' ]
    },
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
