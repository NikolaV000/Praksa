import { Component, Inject, inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
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
import { ProjectService } from '../../services/project.services';
import { IProject } from '../../interfaces/project.interface';

@Component({
  selector: 'app-add-project',
  imports: [MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  standalone: true
})
export class AddProjectComponent {
  project:IProject={
  _id: "",
  name: "",
  userId: ""
};
  readonly dialogRef = inject(MatDialogRef<AddProjectComponent>);
  readonly projectService = inject(ProjectService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: string }){}

  onSave(): void {
    this.project.userId=this.data.userId;
    if (this.project.name.trim()) {
      this.projectService.createProject(this.project.userId,this.project.name).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Failed to create project:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
