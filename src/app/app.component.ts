// ```
// app.ts
// (c) 2016 David Newman
// blackshuriken@hotmail.com
// app.ts may be freely distributed under the MIT license
// ```

// *src/app/app.ts*

// This file contains the main class as well as the necessary
// decorators for creating the primary `app` `component`

/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {AppState} from './app.service';

import {RouterActive} from './shared/directives/router-active/router-active.directive';

import {Home} from './home';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Import Event component
import {Event} from './event/event.component';

// Import Event_edit component
import {Event_edit} from './event_edit/event_edit.component';

// Import Event_share component
import {Event_share} from './event_share/event_share.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [  ],
  directives: [ Event,
                Event_edit,
                Event_share,
                NgFor,
                RouterActive],
  encapsulation: ViewEncapsulation.None,
  pipes: [],
  // Load our main `Sass` file into our `app` `component`
  styleUrls: [require('!style!css!sass!../sass/main.scss')],
  template: `
    <nav>
      <div class="nav-wrapper container">
          <a id="app-logo" href="#" class="brand-logo">planit</a>
          <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li router-active><a [routerLink]=" ['Home'] ">Home</a></li>
            <li router-active><a [routerLink]=" ['Event'] ">Event</a></li>
            <li router-active><a [routerLink]=" ['Event_edit'] ">Event_Edit</a></li>
            <li router-active><a [routerLink]=" ['Event_share'] ">Event_Share</a></li>
          </ul>
          <ul class="side-nav" id="mobile-demo">
            <li router-active><a [routerLink]=" ['Home'] ">Home</a></li>
            <li router-active><a [routerLink]=" ['Event'] ">Event</a></li>
            <li router-active><a [routerLink]=" ['Event_edit'] ">Event_Edit</a></li>
            <li router-active><a [routerLink]=" ['Event_share'] ">Event_Share</a></li>
          </ul>
        </div>
         </nav>
      <router-outlet></router-outlet>

      <footer class="page-footer">
            <div class="container center">
            Made with &#9825; by <a [href]="url">Dan</a>
            </div>
        </footer>
  `
})
@RouteConfig([
  { path: '/', name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/event', component: Event, name: 'Event' },
  { path: '/event_edit', component: Event_edit, name: 'Event_edit' },
  { path: '/event_edit/:id/:password', component: Event_edit, name: 'Event_edit_withId' },
  { path: '/event_share', component: Event_share, name: 'Event_share' },
  { path: '/event_share/:id', component: Event_share, name: 'Event_share_withId' },
])
export class App {
  angularLogo = 'assets/img/angular-logo.png';
  name = 'Planit';
  url = 'https://github.com/DanGeffroy/';

  // Pass in our application `state`
  // Alternative to using `redux`
  constructor(public appState: AppState) {}

  // Fire off upon initialization
  ngOnInit() {

    console.log('Initial App State', this.appState.state);
  }
}

/*
 * For help or questions please contact us at @datatype_void on twitter
 * or our chat on Slack at http://www.davidniciforovic.com/wp-login.php?action=slack-invitation
 */
