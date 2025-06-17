import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProjectComponent } from '../../shared/dialogs/add-project/add-project.component';
import { IProject } from '../../shared/interfaces/project.interface';
import { ProjectService } from '../../shared/services/project.services';
import { UpdateProjectComponent } from '../../shared/dialogs/update-project/update-project.component';


@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [ CommonModule,
    MatDialogModule,       
    RouterModule  ],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  projects: IProject[] = [];
  projectService = inject(ProjectService)
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) => (this.projects = projects),
      error: (err) => console.error('Failed to load projects:', err)
    });
  }
  goToTaskPage(projectId: string) {
    this.router.navigate([`/${projectId}/task-page`]);
  }
  openAddProjectDialog() {
      let dialogRef = this.dialog.open(AddProjectComponent, {
        height: '200px',
        width: '400px',
      });
      dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProjects(); // Refresh the project list
      });
  
    }
 
  onDelete(project_id?: string) {
    if (!project_id) return;
    this.projectService.deleteProject(project_id).subscribe({
      next: () => this.loadProjects(),
      error: (err) => console.error('Delete failed', err)
    });
  }

  onUpdate(project: IProject) {
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      data: project,
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProjects();
    });
  }


}
