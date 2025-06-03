import { Component, inject, signal} from '@angular/core';
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
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true
})

export class AddTaskComponent {
task = { name: '', description: '' };
constructor(private dialogRef: MatDialogRef<AddTaskComponent>) {}
  addTask(): void {
    if (this.task.name.trim()) {
      this.dialogRef.close(this.task.name);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  

}
