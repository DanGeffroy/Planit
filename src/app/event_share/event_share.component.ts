
import {Component} from '@angular/core';
import {Event_shareService} from './event_share.service';

// We `import` `http` into our `Event_shareService` but we can only
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
    // Let Angular 2 know about `Http` and `Event_shareService`
    directives:[RouterActive],
    providers: [...HTTP_PROVIDERS, Event_shareService],
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
    guest: [],
    shoppingList: []
  };

  private state : boolean = true;
  private subscription: Subscription;

  private event_shares: Array<Event_share> = [];
  private router : Router;
  private tmpId : String = null;
  private event_shareService: Event_shareService;
  selectedId;
  constructor(public _event_shareService: Event_shareService,_router: Router,private params:RouteParams) {
    console.log('Event_share constructor go!');
    this.router = _router;
     //let id = +this.route.snapshot.params['id'];
      //this.event_shares = [];
      this.tmpId = params.get('id');
      this.event_shareService = _event_shareService;
      this.updateView();

  }

  updateView(){
    if(this.tmpId === null){
      this.state = false
    }
    else{
      this.event_shareService.getOne(this.tmpId)
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


  deleteShoppingListEllement(ellement){
    // loop through all of the `directions` in the `selectedRecipe`
    for (let i = 0; i <  this.event_shareData.shoppingList.length; i++) {
      // if the `direction` at the current index matches that of the one
      // the user is trying to delete
      if (this.event_shareData.shoppingList[i] === ellement) {
        // delete the `direction` at the current index
        this.event_shareData.shoppingList.splice(i, 1);
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
    if (!this.event_shareData.shoppingList)
    this.event_shareData.shoppingList = [];

    this.event_shareData.shoppingList.push(direction);
  }

  editEvent() {

      this.event_shareService.editEvent(this.event_shareData)
        .subscribe((res) => {
            console.log("saved");
        });
  }
  findEvent(){
       this.updateView();
  }
}
