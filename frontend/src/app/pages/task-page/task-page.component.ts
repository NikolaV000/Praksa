import { Component, OnInit } from '@angular/core';
import { BacklogComponent } from '../../shared/components/backlog/backlog.component';
import { TodoComponent } from '../../shared/components/todo/todo.component';
import { InProgressComponent } from '../../shared/components/in_progress/in_progress.component';
import { DoneComponent } from '../../shared/components/done/done.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../shared/interfaces/task.interface';
import { TodoService } from '../../shared/services/todo.service';

@Component({
  selector: 'app-task-page',
  imports: [BacklogComponent,
      TodoComponent,
      InProgressComponent,
      DoneComponent,],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent  {
  constructor(

    private router: Router,

  ) {
  }
  

}
