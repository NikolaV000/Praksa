import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BacklogComponent } from "./shared/components/backlog/backlog.component";
import { TodoComponent } from './shared/components/todo/todo.component';
import { InProgressComponent } from './shared/components/in_progress/in_progress.component';
import { DoneComponent } from './shared/components/done/done.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    BacklogComponent,
    TodoComponent,
    InProgressComponent,
    DoneComponent
]
})
export class AppComponent {;
}
