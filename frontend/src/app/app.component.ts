import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BacklogComponent } from "./shared/components/backlog/backlog.component";
import { TodoComponent } from './shared/components/todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    BacklogComponent,
    TodoComponent
  ]
})
export class AppComponent {;
}
