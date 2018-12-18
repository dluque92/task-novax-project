import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Task } from '../../core/interfaces/common.interface';
import { AuthService } from './auth.service';

const BACKEND_URL = 'https://task-novax-project.firebaseio.com/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  async get(): Promise<Array<Task>> {
    try {
      const token = await this.authService.getToken();
      const url = BACKEND_URL + '.json?auth=' + token;

      return await this.http.get<Array<Task>>(url).toPromise();
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }

  async post(newTask: Task): Promise<string> {
    try {
      const token = await this.authService.getToken();
      const url = BACKEND_URL + '.json?auth=' + token;

      return await this.http.post<string>(url, newTask).toPromise();
    } catch (error) {
      throw (error as HttpErrorResponse).message;
    }
  }

  put(editedTask: Task): void { }

  delete(deleteTask: Task): void { }
}
