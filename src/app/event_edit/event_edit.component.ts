import {Component} from '@angular/core';

import {Event_editService} from './event_edit.service';

// We `import` `http` into our `Event_editService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'event_edit',
    // Let Angular 2 know about `Http` and `Event_editService`
    providers: [...HTTP_PROVIDERS, Event_editService],
    template: require('./event_edit.html')
})
export class Event_edit {

  // Initialize our `event_editData.text` to an empty `string`
  event_editData = {
    title: "",
    date: "",
    place: "",
    tags: [],
    description: "",
    guest: [],
    shoppingList: []
  };

  private event_edits: Array<Event_edit> = [];

  constructor(public event_editService: Event_editService) {
    console.log('Event_edit constructor go!');

      //this.event_edits = [];
      event_editService.getOne("5823194d408d2da5e30163cd")
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `event_edit` array with the `response` data
            this.event_editData = res;

        });
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
}