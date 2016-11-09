import {Component} from '@angular/core';

import {EventService} from './event.service';

// We `import` `http` into our `EventService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';


import {RouteConfig, Router} from '@angular/router-deprecated';
// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'event',
    // Let Angular 2 know about `Http` and `EventService`
    providers: [...HTTP_PROVIDERS, EventService],
    template: require('./event.html')
})
export class Event {

  // Initialize our `eventData.text` to an empty `string`
  eventData = {
    title: "",
    date: "",
    place: "",
    tags: [],
    description: "",
    guest: [],
    shoppingList: []
  };
  router: Router;


  private events: Array<Event> = [];

  constructor(public eventService: EventService, _router:Router) {
    console.log('Event constructor go!');
    this.router = _router;

      //this.events = [];
      eventService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `event` array with the `response` data
            this.events = res;
            // Reset `event` input
            this.eventData.title = '';
            this.eventData.date = "";
            this.eventData.place = "";
            this.eventData.tags = [];
            this.eventData.description = "";
            this.eventData.guest = [];
            this.eventData.shoppingList = [];
        });
  }

  createEvent() {

      this.eventService.createEvent(this.eventData)
        .subscribe((res) => {
            console.log(res._id);
             this.router.navigate(['/Event_edit_withId',{id: res._id}]);
        });
  }

  deleteEvent(id) {

    this.eventService.deleteEvent(id)
      .subscribe((res) => {

          // Populate our `event` array with the `response` data
          this.events = res;
      });
  }

  deleteShoppingListEllement(ellement){
    // loop through all of the `directions` in the `selectedRecipe`
    for (let i = 0; i <  this.eventData.shoppingList.length; i++) {
      // if the `direction` at the current index matches that of the one
      // the user is trying to delete
      if (this.eventData.shoppingList[i] === ellement) {
        // delete the `direction` at the current index
        this.eventData.shoppingList.splice(i, 1);
      }
    }
  }

  // Whenever the user needs to add a new `direction`, push an
  // empty `direction` object to the `direction` array on the
  // `selectedRecipe`
  newShoppingListEllement() {

    // blank `direction` object
    let direction = {
      step: ''
    };

    // Check to see if the `directions` array exists before
    // attempting to push a `direction` to it
    if (!this.eventData.shoppingList)
    this.eventData.shoppingList = [];

    this.eventData.shoppingList.push(direction);
  }
}
