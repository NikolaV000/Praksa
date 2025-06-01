import { Component, inject, signal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialog,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-project',
  imports: [MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  standalone: true
})
export class AddProjectComponent {
  readonly list = signal('');
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: {name: this.list()},

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.list.set(result);
      }
    });

  }
    readonly dialogRef = inject(MatDialogRef<AddProjectComponent>);

    onNoClick(): void {
      this.dialogRef.close();
    }

}
