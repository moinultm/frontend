import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';


import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [ LayoutComponent,HeaderComponent, FooterComponent, SidebarComponent ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    OverlayscrollbarsModule,
  ]
})
export class LayoutModule { }
