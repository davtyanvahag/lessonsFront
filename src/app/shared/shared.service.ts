import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  private hasSideBar = new BehaviorSubject<boolean>(false);
  hasSideBar$ = this.hasSideBar.asObservable();

  constructor(private http: HttpClient) {
  }

  loggedInStatus(bool) {
    this.isLoggedIn.next(bool);
  }

  hasSideBarStatus(bool) {
    this.hasSideBar.next(bool);
  }

  currentUser() {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.get(`${environment.apiUrl}`  + '/users/getCurrentUser', { headers: headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getContacts() {
    return this.http.get(environment.apiUrl + '/contacts/get-user-side').pipe(
      retry(1),
      catchError(this.handleError)

    );
  }

  getAbout() {
    return this.http.get(environment.apiUrl + '/about/get-user-side').pipe(
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
