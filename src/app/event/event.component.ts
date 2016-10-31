import {Component} from '@angular/core';

import {EventService} from './event.service';

// We `import` `http` into our `EventService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

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
    text: ''
  };

  private events: Array<Event> = [];

  constructor(public eventService: EventService) {
    console.log('Event constructor go!');

      //this.events = [];
      eventService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `event` array with the `response` data
            this.events = res;
            // Reset `event` input
            this.eventData.text = '';
        });
  }

  createEvent() {

      this.eventService.createEvent(this.eventData)
        .subscribe((res) => {

            // Populate our `event` array with the `response` data
            this.events = res;
            // Reset `event` input
            this.eventData.text = '';
        });
  }

  deleteEvent(id) {

    this.eventService.deleteEvent(id)
      .subscribe((res) => {

          // Populate our `event` array with the `response` data
          this.events = res;
      });
  }
}
