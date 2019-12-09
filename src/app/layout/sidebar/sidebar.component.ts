import { Component, OnInit, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
import { AuthenticationService } from '@app/core/services/security/authentication.service';
import { ConfigureService } from '@app/core/services/common/config.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('mainSidebar', { static: false }) mainSidebar;


  constructor(  private Auth: AuthenticationService,
      private configure:ConfigureService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

   $('[data-widget="treeview"]').each(function() {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
  });
  }


  logout(): void {
    this.Auth.logout();
  }


}
