
import {Component} from '@angular/core';
import {Event_editService} from './event_edit.service';

// We `import` `http` into our `Event_editService` but we can only
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
    // Let Angular 2 know about `Http` and `Event_editService`
    directives:[RouterActive],
    providers: [...HTTP_PROVIDERS, Event_editService],
    template: require('./event_edit.html')
})
export class Event_edit {

  // Initialize our `event_editData.text` to an empty `string`
  event_editData = {
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

  private event_edits: Array<Event_edit> = [];
  private router : Router;
  private tmpId : String = null;
  private event_editService: Event_editService;
  selectedId;
  constructor(public _event_editService: Event_editService,_router: Router,private params:RouteParams) {
    console.log('Event_edit constructor go!');
    this.router = _router;
     //let id = +this.route.snapshot.params['id'];
      //this.event_edits = [];
      this.tmpId = params.get('id');
      this.event_editService = _event_editService;
      this.updateView();

  }

  updateView(){
    if(this.tmpId === null){
      this.state = false
    }
    else{
      this.event_editService.getOne(this.tmpId)
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

      this.event_editService.editEvent(this.event_editData)
        .subscribe((res) => {
            console.log("saved");
        });
  }
  findEvent(){
       this.updateView();
  }
}
