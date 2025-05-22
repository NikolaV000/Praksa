import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AddListComponent } from '../../shared/dialogs/add-list/add-list.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-page',
  imports: [],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent {
  readonly dialog = inject(MatDialog);
  constructor(private router: Router) {
  }
  goToTaskPage(){
    this.router.navigate(['/task-page']);
  }
  openAddListDialog() {
      let dialogRef = this.dialog.open(AddListComponent, {
        height: '200px',
        width: '400px',
      });
  
    }
 
  onDelete(project_id?: string) {}
  onUpdate(project_id?: string) {}

}
