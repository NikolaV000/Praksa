import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/project.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/project';

  constructor(private http: HttpClient) {}


  getProjects(userId: string): Observable<IProject[]> {
    return this.http.get<IProject[]>(`http://localhost:8080/api/project/${userId}`);
  }

  createProject(userId: string,name: string): Observable<IProject> {
    return this.http.post<IProject>(`${this.apiUrl}/${userId}`, { name });
  }

  updateProject(userId: string,id: string, name: string): Observable<IProject> {
    return this.http.put<IProject>(`${this.apiUrl}/${userId}/${id}`, { name });
  }

  deleteProject(userId: string,id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/${id}`);
  }
}

