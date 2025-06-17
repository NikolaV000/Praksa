import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string = "http://localhost:8080/api/tasks";
  taskEmit = new EventEmitter<string>();
  constructor(
    private http: HttpClient
  ) { }

  taskConfirm(projectId: string) {
     this.taskEmit.emit(projectId);
  }
  
}
