import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTestsService {

  constructor(private http: HttpClient) { }

  getUserOrders(page, limit) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}`  + '/orders/get-current-user-orders/' + page + '/' + limit, { headers: headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getUserSingleOrder(id) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}`  + '/orders/getOneForUser/' + id, { headers: headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  answerUpdate(obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.post(`${environment.apiUrl}`  + '/orders/answerUpdate/', obj, { headers: headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
