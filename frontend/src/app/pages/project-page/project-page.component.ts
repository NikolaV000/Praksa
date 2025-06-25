import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProjectComponent } from '../../shared/dialogs/add-project/add-project.component';
import { IProject } from '../../shared/interfaces/project.interface';
import { ProjectService } from '../../shared/services/project.services';
import { UpdateProjectComponent } from '../../shared/dialogs/update-project/update-project.component';
import { MenuComponent } from "../../shared/components/menu/menu.component";
import { UserDialogComponent } from '../../shared/dialogs/user-dialog/user-dialog.component';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    RouterModule, MenuComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  projects: IProject[] = [];
  projectService = inject(ProjectService);
  authService = inject(AuthService);
  username: string = '';
  role: 'admin' | 'guest' = 'guest';
  adminIdFromUrl: string = '';
  currentUserRole: string = '';
  currentUserId: string = '';
  userId: string | null = null;
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.userId = params.get('userId');
    console.log('User ID from URL:', this.userId);
    this.loadProjects();
    });
    const user = this.authService.currentUser;
    if (user) {
      this.username = user.username;
      this.role = user.role;
      this.currentUserId=user._id;

    }
  }
  loadProjects() {
  if (this.userId) {
  this.projectService.getProjects(this.userId).subscribe({
    next: (projects) => this.projects = projects,
    error: (err) => console.error('Failed to load projects:', err)
  });
} else {
  console.warn('No userId found in route!');
}
  }
  goToTaskPage(projectId: string) {
    this.router.navigate([`/${projectId}/task-page`]);
  }
  openAddProjectDialog() {
      let dialogRef = this.dialog.open(AddProjectComponent, {
        height: '200px',
        width: '400px',
        data: {
        userId: this.userId
      }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) this.loadProjects(); // Refresh the project list
      });
  
    }
  openUserDialog(){
    const user = this.authService.currentUser;
    if (!user) return;
    let dialogRef = this.dialog.open(UserDialogComponent, {
        data: {
          username: user.username,
          role: user.role
        },
        height: '200px',
        width: '400px',
    });
    dialogRef.afterClosed().subscribe();

  }
 
  onDelete(project: IProject) {
    if (!project._id && !project.userId) return;
    this.projectService.deleteProject(project.userId,project._id).subscribe({
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
