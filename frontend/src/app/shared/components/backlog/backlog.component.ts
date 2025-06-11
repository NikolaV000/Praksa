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
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-backlog',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css',
  standalone: true,
  providers: [
    TodoService,
    TaskService
  ]
})
export class BacklogComponent {

  backlog: ITask[] = [];
  todo: ITask[] = [];
  in_progress: ITask[] = [];
  done: ITask[] = [];
  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private taskService: TaskService
  ) {
  
  }
  
  ngOnInit() {
    this.getTasks();
    this.taskService.taskEmit.subscribe(res => this.getTasks())
  }
  getTasks(){
    this.todoService.getTasks()
      .subscribe((tasks:ITask[]) =>{
        this.backlog = tasks.filter(backlog=> backlog.status === 'backlog');
        this.todo = tasks.filter(todo => todo.status === 'todo');
        this.in_progress = tasks.filter(in_progress => in_progress.status === 'in_progress');
        this.done = tasks.filter(done => done.status === 'done');
      });
     

  }
  
  openAddTaskDialog() {
    let dialogRef = this.dialog.open(AddTaskComponent, {
      autoFocus: false,
      height: '400px',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backlog.push(result);
      }
      this.getTasks();
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
