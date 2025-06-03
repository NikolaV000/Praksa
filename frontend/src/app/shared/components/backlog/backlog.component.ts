import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../dialogs/add-task/add-task.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-backlog',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css',
  standalone: true,
  providers: [
    TodoService
  ]
})
export class BacklogComponent {
  constructor(
    private todoService: TodoService,private dialog: MatDialog
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
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backlog.push(result);
      }
    });
    

  }
  
  backlog:string[] = [];;
  

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  onDelete(itemIndex: number): void {
    this.backlog.splice(itemIndex, 1);

  }
  onUpdate(project_id?: string) {}

}
