import { Component, OnInit, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
import { AuthenticationService } from '@app/core/services/security/authentication.service';
import { ConfigureService } from '@app/core/services/common/config.service';
import { environment } from '@env/environment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('mainSidebar', { static: false }) mainSidebar;

  logoPreview: any;
  constructor(
    private authenticationService: AuthenticationService,
      private configure:ConfigureService) { }

  ngOnInit() {
    this.logoPreview = environment.uploads_url + 'site/';
  }

  setConfig(configure: string) {
    return this.configure.use(configure);
   }

  ngAfterViewInit() {
   $('[data-widget="treeview"]').each(function() {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
  });
  }



  logout(): void {
    this.authenticationService.logout();
  }


}
