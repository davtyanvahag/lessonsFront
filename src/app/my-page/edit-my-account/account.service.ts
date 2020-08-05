import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  headers = new HttpHeaders({'Content-Type': 'application/json', token: localStorage.getItem('token')});

  constructor(private http: HttpClient) {
    console.log();
  }

  edit(obj) {
    return this.http.post(environment.apiUrl + '/users/updatePasswordWithConfirm', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(obj) {
    return this.http.post(environment.apiUrl + '/users/update', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  resetPassword(obj) {
    return this.http.post(environment.apiUrl + '/users/updatePassword', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getCurrenUser() {
    console.log(localStorage.getItem('token'))
    const headers = new HttpHeaders({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.get(environment.apiUrl + '/users/getCurrentUser', {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
