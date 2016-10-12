import {Component} from '@angular/core';

import {TodoService} from './todo.service';

// We `import` `http` into our `TodoService` but we can only
// specify providers within our component
import {HTTP_PROVIDERS} from '@angular/http';

// Import NgFor directive
import {NgFor} from '@angular/common';

// Create metadata with the `@Component` decorator
@Component({
    // HTML tag for specifying this component
    selector: 'todo',
    // Let Angular 2 know about `Http` and `TodoService`
    providers: [...HTTP_PROVIDERS, TodoService],
    template: require('./todo.html')
})
export class Todo {

  // Initialize our `todoData.text` to an empty `string`
  todoData = {
    text: ''
  };

  private todos: Array<Todo> = [];

  constructor(public todoService: TodoService) {
    console.log('Todo constructor go!');

      //this.todos = [];
      todoService.getAll()
        // `Rxjs`; we subscribe to the response
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        });
  }

  createTodo() {

      this.todoService.createTodo(this.todoData)
        .subscribe((res) => {

            // Populate our `todo` array with the `response` data
            this.todos = res;
            // Reset `todo` input
            this.todoData.text = '';
        });
  }

  deleteTodo(id) {

    this.todoService.deleteTodo(id)
      .subscribe((res) => {

          // Populate our `todo` array with the `response` data
          this.todos = res;
      });
  }
}
