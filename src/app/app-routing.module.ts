import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './authentication/not-found/not-found.component';


const routes: Routes = [
  {path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  {path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
