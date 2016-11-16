
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
    selector: 'event_edit',
    // Let Angular 2 know about `Http` and `EventService`
    directives:[RouterActive],
    providers: [...HTTP_PROVIDERS, EventService],
    template: require('./event_edit.html')
})
export class Event_edit {

  // Initialize our `event_editData.text` to an empty `string`
  event_editData = {
    _id:"",
    title: "",
    password:"",
    date: "",
    place: "",
    tags: [],
    description: "",
    attendees: [],
    shoppingList: []
  };

  private state : boolean = true;
  private subscription: Subscription;

  private event_edits: Array<Event_edit> = [];
  private router : Router;
  private tmpId : String = null;
  private tmpPassword : String = null;
  private eventService: EventService;
  selectedId;
  constructor(public _eventService: EventService,_router: Router,private params:RouteParams) {
    console.log('Event_edit constructor go!');
    this.router = _router;
     //let id = +this.route.snapshot.params['id'];
      //this.event_edits = [];
      this.tmpId = params.get('id');
      this.tmpPassword = params.get('password');
      this.eventService = _eventService;
      this.updateView();

  }

  updateView(){
    if(this.tmpId === null || this.tmpPassword === null){
      this.state = false
    }
    else{
      this.eventService.getOneWithPassword(this.tmpId,this.tmpPassword)
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {
            // Populate our `event_edit` array with the `response` data
            this.event_editData = res;
            if(this.event_editData._id === undefined){
              this.state = false;
            }
            else{
              this.state = true;
            }
        }
        );
    }
  }


  deleteShoppingListEllement(ellement){
    // loop through all of the `directions` in the `selectedRecipe`
    for (let i = 0; i <  this.event_editData.shoppingList.length; i++) {
      // if the `direction` at the current index matches that of the one
      // the user is trying to delete
      if (this.event_editData.shoppingList[i] === ellement) {
        // delete the `direction` at the current index
        this.event_editData.shoppingList.splice(i, 1);
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
    if (!this.event_editData.shoppingList)
    this.event_editData.shoppingList = [];

    this.event_editData.shoppingList.push(direction);
  }

  editEvent() {
      this.eventService.editEvent(this.event_editData)
        .subscribe((res) => {
            console.log("saved");
        });
  }
  findEvent(){
       this.updateView();
  }
  deleteEvent() {

    this.eventService.deleteEvent(this.event_editData._id,this.event_editData.password)
      .subscribe((res) => {
         this.router.navigate(['/Event']);
      });
  }
}
