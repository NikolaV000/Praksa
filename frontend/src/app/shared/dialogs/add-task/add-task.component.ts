import { Component, Inject,} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { TaskService } from '../../services/task.service';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ITask } from '../../interfaces/task.interface';
import { IProject } from '../../interfaces/project.interface';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-task',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ], 
  providers: [
    TodoService,
    TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true
})

export class AddTaskComponent {
task:ITask={
  title: '', description: '',
  _id: '',
  status: '',
  projectId: ''
};
constructor(
  private todoService: TodoService,
  private dialogRef: MatDialogRef<AddTaskComponent>,
  private taskService: TaskService,
  private route: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: { projectId: string }
) {}

 
 createTask() {
  if (!this.task.status || this.task.status.trim() === '') {
    this.task.status = 'backlog'; 
  }
  this.task.projectId=this.data.projectId;

    this.todoService.createTask(this.task.projectId,this.task).subscribe({
      next: value => {
        console.log('Received value:', value);
        this.taskService.taskConfirm(this.task.projectId);
        this.dialogRef.close(value);
      },
      error: err => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Observable completed'); 
        this.taskService.taskConfirm(this.task.projectId);
      }
    });
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  

}
