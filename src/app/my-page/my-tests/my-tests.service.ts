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

  getOneForUserAnswered(id) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}`  + '/orders/getOneForUserAnswered/' + id, { headers: headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  delete(id) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.delete(`${environment.apiUrl}`  + '/orders/deleteforUser/' + id, { headers: headers }).pipe(
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
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
