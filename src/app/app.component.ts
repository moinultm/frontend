import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'frontend';
  loading=false;

  constructor(private router: Router) {

    router.events.subscribe( (event: Event) => {

      if (event instanceof NavigationStart) {
          // Show loading indicator
          this.loading=true;
          //console.log('loading');
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          this.loading=false;
          //console.log('loaded');
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
      }
  });

  }

  ngOnInit() {

  }

}
