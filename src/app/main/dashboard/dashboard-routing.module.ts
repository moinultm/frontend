import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';
import { DashboardResolver } from '@app/core/resolvers/dashboard.resolver';


const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [ AuthGuard ],
        resolve: {
          DashboardResolver
        },
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
