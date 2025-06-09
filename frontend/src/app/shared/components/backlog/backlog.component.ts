import { Component, Inject} from '@angular/core';
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
import { TodoComponent } from '../todo/todo.component';


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
  todo: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  constructor(
    private todoService: TodoService,private dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.getTasks();
  }
  getTasks(){
    this.todoService.getTasks()
      .subscribe(tasks => this.backlog = tasks);
      this.backlog = this.backlog.filter(backlog=> backlog.status === 'backlog');
      this.todo = this.todo.filter(todo => todo.status === 'todo');
      this.inProgress = this.inProgress.filter(inProgress => inProgress.status === 'in-progress');
      this.done = this.done.filter(done => done.status === 'done');
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
  
  drop(event: CdkDragDrop<ITask[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      task.status = newStatus;
      this.todoService.updateTask(task._id, task).subscribe({
      next: updated => console.log('Task status updated:', updated),
      error: err => console.error('Error updating task status:', err)
    });
    }
  }
  onDelete(task: ITask): void {
    const taskId = task?._id;

    if (!task || !task._id) {
    console.error('Task or task._id is missing:', task);
    return;
    }
  
    this.todoService.deleteTask(taskId).subscribe({
      next: () => {
        this.backlog = this.backlog.filter(t => t._id !== taskId);
      },
      error: (err) => {
        console.error('Error deleting task:', err);
      }
    });
  }
  

  
  onUpdate(task: ITask) {


    let dialogRef = this.dialog.open(UpdateTaskComponent, {
      height: '400px',
      width: '600px',
      data: {
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status
      }
      
    });
    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask) {
        const index = this.backlog.findIndex(t => t._id === updatedTask._id);
        if (index > -1) {
          this.backlog[index] = updatedTask;
        }
        
      }
    });

  }

}
