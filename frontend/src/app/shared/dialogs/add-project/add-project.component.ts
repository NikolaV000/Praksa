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
import { ProjectService } from '../../services/project.services';

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
  projectName = '';
  readonly dialogRef = inject(MatDialogRef<AddProjectComponent>);
  readonly projectService = inject(ProjectService);

  onSave(): void {
    if (this.projectName.trim()) {
      this.projectService.createProject(this.projectName).subscribe({
        next: () => this.dialogRef.close(true),
        error: err => console.error('Failed to create project:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
