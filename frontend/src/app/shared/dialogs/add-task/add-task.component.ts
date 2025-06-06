import { Component,} from '@angular/core';
import { TodoService } from '../../services/todo.service';
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
    MatDialogTitle,],
     providers: [
    TodoService
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true
})

export class AddTaskComponent {
task = { name: '', description: '' };
constructor(private todoService: TodoService,private dialogRef: MatDialogRef<AddTaskComponent>) {}
 
 createTask() {
    this.todoService.createTask({
      title: this.task.name,
      description: this.task.description
    }).subscribe({
      next: value => {
        console.log('Received value:', value);
      },
      error: err => {
        console.error('Error:', err);
      },
      complete: () => {
        console.log('Observable completed');
        this.dialogRef.close();
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  

}
