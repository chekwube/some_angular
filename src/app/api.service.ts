import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'
import { Http, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  // API: GET /todos
  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .pipe(map(response => {
        const todos = response.json();
        return todos.map((todo) => new Todo(todo));
      }))
      .pipe(catchError(this.handleError));
  }

  // API: POST /todos
  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  // API: GET /todos/:id
  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  // API: PUT /todos/:id
  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(map(response => {
        return new Todo(response.json());
      }))
      .pipe(catchError(this.handleError));
  }

  // DELETE /todos/:id
  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null))
      .pipe(catchError(this.handleError));
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
