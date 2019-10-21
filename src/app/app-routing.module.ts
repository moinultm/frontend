import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './authentication/not-found/not-found.component';

import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { RequestResetComponent } from './main/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './main/password/response-reset/response-reset.component';
import { ProfileComponent } from './main/profile/profile.component';
import { BeforeLoginService } from './services/auth/before-login.service';
import { AfterLoginService } from './services/auth/after-login.service';




const routes: Routes = [
  {path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
/*   {
    path:'login',
    component:LoginComponent,
    canActivate:[BeforeLoginService]

  },
  {
    path: 'signup',
    component: SignupComponent,
     canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
   canActivate: [AfterLoginService]
  },
  {
    path: 'request-password-reset',
    component: RequestResetComponent,
  canActivate: [BeforeLoginService]
  },
  {
    path: 'response-password-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
