import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleTestService {

  constructor(private http: HttpClient) {
    console.log();
  }
  getOneFront(id) {
    return this.http.get(environment.apiUrl + '/tests/get-one-for-userside/' + id).pipe(
      retry(1),
      catchError(this.handleError)

    );
  }

  order(obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.post(environment.apiUrl + '/orders/add', obj, { headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateUsedSum(obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.put(environment.apiUrl + '/tests/updateUsedSum', obj, { headers: headers}).pipe(
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
