import { NgModule, APP_INITIALIZER } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '@app/core/services/security/guards/interceptor.service';


import { MaterialsModule} from '@app/material.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ToastrModule } from 'ngx-toastr';

import { TranslateService } from './core/services/common/translate.service';
import { TranslateModule } from './shared/translate/translate.module';

import { NotFoundComponent } from './authentication/not-found/not-found.component';
import { ConfigureService } from './core/services/common/config.service';
import { SafePipe } from './core/services/pipes/safe.pipe';



export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('en');
}

export function setupConfigFactory(
  service: ConfigureService): Function {
  return () => service.use('1');
}

/*
LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
*/

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NavbarComponent,
    SafePipe 

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

    SnotifyService,
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
     },

   { provide: 'SnotifyToastConfig',
   useValue: ToastDefaults
  },
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    },

    {
      provide: APP_INITIALIZER,
      useFactory: setupConfigFactory,
      deps: [ ConfigureService ],
      multi: true
    },
],
  bootstrap: [AppComponent],


})
export class AppModule { }
