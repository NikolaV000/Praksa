import { Component, inject } from '@angular/core';
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
import { TodoService } from '../../services/todo.service';
import { ITask } from '../../interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../../dialogs/update-task/update-task.component';
import { TaskService } from '../../services/task.service';
import { IProject } from '../../interfaces/project.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule,CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  standalone: true
})
export class TodoComponent {
  backlog: ITask[] = [];
  todo: ITask[] = [];
  in_progress: ITask[] = [];
  done: ITask[] = [];
  authService = inject(AuthService);
  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}
  
    projectId:string='';
    username: string = '';
    role: 'admin' | 'guest' = 'guest';
  ngOnInit() {
    this.projectId=this.route.snapshot.paramMap.get('projectId')!;
    this.getTasks();
    this.taskService.taskEmit.subscribe((project) => {
    if (project === this.projectId) {
      this.getTasks(); 
    }
    });
    const user = this.authService.currentUser;
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
  }
  getTasks(){
    this.todoService.getTasks(this.projectId)
      .subscribe((tasks:ITask[]) =>{
        this.backlog = tasks.filter(backlog=> backlog.status === 'backlog');
        this.todo = tasks.filter(todo => todo.status === 'todo');
        this.in_progress = tasks.filter(in_progress => in_progress.status === 'in_progress');
        this.done = tasks.filter(done => done.status === 'done');
      });
     

  }

  drop(event: CdkDragDrop<ITask[]>,newStatus: string) {
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
      this.todoService.updateTask(this.projectId,task._id,task).subscribe({
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
       
         this.todoService.deleteTask(this.projectId,taskId).subscribe({
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
             status: task.status,
             projectId: this.projectId
           }
           
         });
         dialogRef.afterClosed().subscribe(updatedTask => {
           if (updatedTask) {
            
            this.getTasks();
             
           }
         });
     
       }




}
