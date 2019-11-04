import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '@app/core/services/security/guards/auth.guard';
import { RoleGuard } from '@app/core/services/security/guards/role.guard';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [ AuthGuard ]
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
