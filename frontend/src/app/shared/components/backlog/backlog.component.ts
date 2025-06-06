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
import { UpdateTaskComponent } from '../../dialogs/update-task/update-task.component';
import { ITask } from '../../interfaces/task.interface';


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
  backlog: ITask[] = [];
  constructor(
    private todoService: TodoService,private dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.getTasks();
  }
  getTasks(){
    this.todoService.getTasks()
      .subscribe(tasks => this.backlog = tasks);
     
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
  
  drop(event: CdkDragDrop<ITask[]>) {
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
  onUpdate(itemIndex: number) {


    let dialogRef = this.dialog.open(UpdateTaskComponent, {
      height: '400px',
      width: '600px',
      
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backlog[itemIndex] = result;
      }
    });

  }

}
