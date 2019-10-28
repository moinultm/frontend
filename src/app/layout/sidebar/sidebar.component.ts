import { Component, OnInit, ViewChild } from '@angular/core';

import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild('mainSidebar', { static: false }) mainSidebar;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

   $('[data-widget="treeview"]').each(function() {
      AdminLte.Treeview._jQueryInterface.call($(this), 'init');
  });
  }


}
