// Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

// UnAuthenticated module routes
const routes: Routes = [

  { path: 'auth', redirectTo: 'login', pathMatch: 'prefix' },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)

  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)

  },
  {
    path: 'recover/:token',
    loadChildren: () => import('./recover/recover.module').then(m => m.RecoverModule)

  }
];

@NgModule({
  declarations: [],
  imports: [
    // Angular modules
    CommonModule,
    // Application routes injection into the application forChild() routes
    RouterModule.forChild(routes)
  ]
})
export class AuthenticationModule { }
