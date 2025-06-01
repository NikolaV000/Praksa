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
  selector: 'app-in_progress',
  imports: [CdkDropList, CdkDrag,MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './in_progress.component.html',
  styleUrl: './in_progress.component.css',
  standalone: true
  
})
export class InProgressComponent {
  in_progress = ["Task1"];

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
