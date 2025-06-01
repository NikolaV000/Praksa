import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  standalone: true
})
export class TodoComponent {
  todo = ["Task1"];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  onDelete(project_id?: string) {}
  onUpdate(project_id?: string) {}




}
