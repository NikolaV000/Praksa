import { Component } from '@angular/core';
import { BacklogComponent } from "./shared/components/backlog/backlog.component";
import { TodoComponent } from './shared/components/todo/todo.component';
import { InProgressComponent } from './shared/components/in_progress/in_progress.component';
import { DoneComponent } from './shared/components/done/done.component';
import { AppRoutingModule } from './app-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { Router } from '@angular/router';
import { MenuComponent } from './shared/components/menu/menu.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    BacklogComponent,
    TodoComponent,
    InProgressComponent,
    DoneComponent,
    AppRoutingModule,
    MenuComponent
  ]
})
export class AppComponent {

  


}
