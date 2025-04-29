import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../dialogs/add-task/add-task.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css',
  standalone: true,
  providers: [
    TodoService
  ]
})
export class BacklogComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    private todoService: TodoService,
  ) {

  }

  createTask() {
    this.todoService.createTask({
      title: 'Task 1',
      descriptin: 'Pleas do it ASAP'
    }).subscribe({
      next(val) {
        console.log('got value ' + val);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }

  openAddTaskDialog() {
    // Now we need to open a dialog here to
    // create a new task and place it in the 
    // backlog column
    //
    // https://material.angular.io/components/dialog/overview
    let dialogRef = this.dialog.open(AddTaskComponent, {
      height: '400px',
      width: '600px',
    });

    


  }

}
