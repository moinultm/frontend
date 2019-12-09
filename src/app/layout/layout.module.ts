import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ConfigModule } from '@app/shared/config/config.module';



@NgModule({
  declarations: [ LayoutComponent,HeaderComponent, FooterComponent, SidebarComponent ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ConfigModule
   ]
})
export class LayoutModule { }
