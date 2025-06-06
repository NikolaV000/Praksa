import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  apiUrl: string = "http://localhost:8080/api/tasks";
  constructor(
    private http: HttpClient
  ) { }

  createTask(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
