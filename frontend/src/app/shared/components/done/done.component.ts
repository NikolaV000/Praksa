import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITask } from '../../interfaces/task.interface';
import { UpdateTaskComponent } from '../../dialogs/update-task/update-task.component';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-done',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './done.component.html',
  styleUrl: './done.component.css',
  standalone: true,
})
export class DoneComponent {
  backlog: ITask[] = [];
  todo: ITask[] = [];
  in_progress: ITask[] = [];
  done: ITask[] = [];
  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private taskService: TaskService
  ) {}
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
          this.getTasks();
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
          this.getTasks();
        }
      });
  
  }
  


}
