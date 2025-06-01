import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../../shared/dialogs/add-project/add-project.component';


@Component({
  selector: 'app-project-page',
  imports: [],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent {
  readonly dialog = inject(MatDialog);
  constructor(private router: Router) {
  }
  goToTaskPage(){
    this.router.navigate(['/task-page']);
  }
  openAddProjectDialog() {
      let dialogRef = this.dialog.open(AddProjectComponent, {
        height: '200px',
        width: '400px',
      });
  
    }
 
  onDelete(project_id?: string) {}
  onUpdate(project_id?: string) {}

}
