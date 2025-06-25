import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProjectService } from '../../services/project.services';
import { IProject } from '../../interfaces/project.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateProjectComponent>);
  readonly data = inject<IProject>(MAT_DIALOG_DATA); 
  readonly projectService = inject(ProjectService);

  projectName: string = this.data.name; 

  onSave(): void {
    const trimmedName = this.projectName.trim();
    if (!trimmedName) return;

    this.projectService.updateProject(this.data.userId,this.data._id!,trimmedName).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Failed to update project:', err)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}