import { Component, inject, Inject, OnInit  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { TaskService } from '../../services/task.service';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-update-task',
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle, CommonModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
  standalone: true,
})
export class UpdateTaskComponent implements OnInit {
  taskService = inject(TaskService);
  todoService= inject(TodoService);
  authService = inject(AuthService);
  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: ITask,
  ) {}
  

  projectId:string='';
  username: string = '';
  role: 'admin' | 'guest' = 'guest';
  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
    
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.projectId=this.data.projectId;
     this.todoService.updateTask(this.projectId,this.data._id,this.data).subscribe({
      next: () => {
        this.taskService.taskConfirm(this.projectId);
        this.dialogRef.close(this.data);
      },
      error: (err) => console.error('Update failed', err),
    });
  }

}
