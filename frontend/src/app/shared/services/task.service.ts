import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string = "http://localhost:8080/api/tasks";
  taskEmit = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient
  ) { }

  taskConfirm() {
     this.taskEmit.emit(true);
  }
  
}
