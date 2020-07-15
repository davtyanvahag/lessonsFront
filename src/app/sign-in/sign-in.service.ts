import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    console.log();
  }

  signIn(obj) {
    return this.http.post(environment.apiUrl + '/users/login', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  resetNewPassword(obj) {
    return this.http.post(environment.apiUrl + '/users/resetNewPasswordForUser', obj, {headers: this.headers}).pipe(
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
