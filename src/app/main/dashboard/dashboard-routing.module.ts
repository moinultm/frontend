import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '@services/security/guards/auth.guard';
import { RoleGuard } from '@services/security/guards/role.guard';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [ AuthGuard, RoleGuard ],
        data: {
          expectedRolesType: 'any',
          expectedRoles: [ 'ROLE_DASHBOARD_ACCESS' ]
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}

/*
canActivate: [ AuthGuard, RoleGuard ],
    data: {
      expectedRolesType: 'any',
      expectedRoles: [ 'ROLE_USERS' ]
    }*/
