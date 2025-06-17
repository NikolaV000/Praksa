import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  apiUrl: string = "http://localhost:8080/api/tasks";
  constructor(
    private http: HttpClient
  ) { }

  createTask(projectId: string, task: ITask): Observable<ITask> {
    console.log('🟡 Sending task:', task); // ✅ now runs
    return this.http.post<ITask>(`${this.apiUrl}/${projectId}`, task);
    
  }
  getTasks(projectId: string): Observable<any> {
    if (!projectId) throw new Error('Project id is required');
    return this.http.get(`${this.apiUrl}/${projectId}`);
  }
  deleteTask(projectId: string,id: string): Observable<any>  {
    return this.http.delete(`http://localhost:8080/api/tasks/${projectId}/${id}`);
  }
  updateTask(projectId: string,taskId:string, task: ITask):Observable<ITask>{
    return this.http.put<ITask>(`${this.apiUrl}/${projectId}/${taskId}`,task);
  }
}
