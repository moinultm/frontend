import { NgModule, APP_INITIALIZER } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialsModule} from '@app/material.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './main/navbar/navbar.component';
import { LoginComponent } from './main/login/login.component';
import { SignupComponent } from './main/signup/signup.component';
import { ProfileComponent } from './main/profile/profile.component';
import { RequestResetComponent } from './main/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './main/password/response-reset/response-reset.component';

import { PoolsService } from './services/auth/pools.service';
import { AuthService } from './services/auth/auth.service';
import { TokenService } from './services/auth/token.service';
import { AfterLoginService } from './services/auth/after-login.service';
import { BeforeLoginService } from './services/auth/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { ToastrModule } from 'ngx-toastr';

import { TranslateService } from './services/common/translate.service';
import { TranslateModule } from './shared/translate/translate.module';

import { NotFoundComponent } from './authentication/not-found/not-found.component';

import {NgxPrintModule} from 'ngx-print';



export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,

    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
     FormsModule,
     HttpClientModule,
    SnotifyModule,
    MaterialsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    }),
    TranslateModule,
 

  ],


  providers: [
    PoolsService,
    AuthService,
    TokenService,
    AfterLoginService,
    BeforeLoginService,
   { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
   SnotifyService,
   TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
