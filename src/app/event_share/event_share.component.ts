
import {Component} from '@angular/core';
import {EventService} from '../event.service';

// We `import` `http` into our `EventService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

import {Subscription } from 'rxjs';

import {RouteConfig, Router,RouteParams} from '@angular/router-deprecated';

import {RouterActive} from '.././shared/directives/router-active/router-active.directive';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'event_share',
    // Let Angular 2 know about `Http` and `EventService`
    directives:[RouterActive],
    providers: [...HTTP_PROVIDERS, EventService],
    template: require('./event_share.html')
})
export class Event_share {

  // Initialize our `event_shareData.text` to an empty `string`
  event_shareData = {
    _id:"",
    title: "",
    date: "",
    place: "",
    tags: [],
    description: "",
    attendees: [],
    shoppingList: []
  };

  private state : boolean = true;
  private subscription: Subscription;

  private event_shares: Array<Event_share> = [];
  private router : Router;
  private tmpId : String = null;
  private eventService: EventService;
  selectedId;

  private newAttendees = [];
  constructor(public _eventService: EventService,_router: Router,private params:RouteParams) {
    console.log('Event_share constructor go!');
    this.router = _router;
     //let id = +this.route.snapshot.params['id'];
      //this.event_shares = [];
      this.tmpId = params.get('id');
      this.eventService = _eventService;
      this.updateView();

  }

  updateView(){
    if(this.tmpId === null){
      this.state = false
    }
    else{
      this.eventService.getOne(this.tmpId)
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {
            // Populate our `event_share` array with the `response` data
            this.event_shareData = res;
            if(this.event_shareData._id === undefined){
              this.state = false;
            }
            else{
              this.state = true;
            }
        }
        );
    }
  }
  // Whenever the user needs to add a new `direction`, push an
  // empty `direction` object to the `direction` array on the
  // `selectedRecipe`
  newAttendee() {

    // blank `direction` object
    let direction = {
      shoppingList: []
    };
    direction.shoppingList =  JSON.parse(JSON.stringify(this.event_shareData.shoppingList));
    direction.shoppingList .forEach(function(element) {
      element.qte = 0
    });
    // Check to see if the `directions` array exists before
    // attempting to push a `direction` to it
    if (!this.newAttendees)
    this.newAttendees = [];

    this.newAttendees.push(direction);
  }
  addNewAttendee(newAttendee){
    this.eventService.addNewAttendee(newAttendee, this.tmpId)
      // `Rxjs`; we subscribe to the response
      .subscribe((res) => {
          // Populate our `event_share` array with the `response` data
          this.event_shareData = res;
          // loop through all of the `newAttendees`
          for (let i = 0; i <  this.newAttendees.length; i++) {
            // if the `attendee` at the current index matches
            if (this.newAttendees[i] === newAttendee) {
              // delete the `atttendee` at the current index
              this.newAttendees.splice(i, 1);
            }
          }
      }
      );

  }
  findEvent(){
       this.updateView();
  }

  decrementShoppingListEllement(ellement){
    ellement.qte--;
  }

  incrementShoppingListEllement(ellement){
    ellement.qte++;
  }
}
