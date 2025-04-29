import { Component, inject, signal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
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
    // MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    // MatDialogRef,
    MatDialogTitle,],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  standalone: true
})

export class AddTaskComponent {
readonly task = signal('');
readonly dialog = inject(MatDialog);
openDialog(): void {
  const dialogRef = this.dialog.open(AddTaskComponent, {
    data: {name: this.task()},

  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result !== undefined) {
      this.task.set(result);
    }
  });

}
  readonly dialogRef = inject(MatDialogRef<AddTaskComponent>);
  // readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
  

}
