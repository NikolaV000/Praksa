import { Component, inject, OnInit } from '@angular/core';
import { BacklogComponent } from '../../shared/components/backlog/backlog.component';
import { TodoComponent } from '../../shared/components/todo/todo.component';
import { InProgressComponent } from '../../shared/components/in_progress/in_progress.component';
import { DoneComponent } from '../../shared/components/done/done.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../shared/interfaces/task.interface';
import { TodoService } from '../../shared/services/todo.service';
import { MenuComponent } from "../../shared/components/menu/menu.component";
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../../shared/dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-task-page',
  imports: [BacklogComponent,
    TodoComponent,
    InProgressComponent,
    DoneComponent, MenuComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent implements OnInit  {
  readonly dialog = inject(MatDialog);
  authService = inject(AuthService);
  username: string = '';
  role: 'admin' | 'guest' = 'guest';
  constructor(
    private router: Router,
  ) {
  }
  ngOnInit(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.username = user.username;
      this.role = user.role;
    }
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
  

}
