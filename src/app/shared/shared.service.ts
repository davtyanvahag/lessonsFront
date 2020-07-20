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
    let errorMessage = '';
    // if (error.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = `Error: ${error.error.message}`;
    // } else {
    //   // server-side error
    //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    // }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
