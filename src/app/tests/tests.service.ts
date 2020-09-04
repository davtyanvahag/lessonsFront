import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestsService {


  constructor(private http: HttpClient) {
    console.log();
  }

  public getSpecialties(page, limit, obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl + '/categories/front/getList/' + `${page}` + '/' + `${limit}`, obj, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public getOne(id) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(environment.apiUrl + '/tests/get-one-for-userside/' + `${id}`, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public getSubSpecialties(page, limit, obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl + '/subcategories/front/getList/' + `${page}` + '/' + `${limit}`, obj, {headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getTests(page, limit) {
    return this.http.get(environment.apiUrl + '/tests/get-all-front-home-page/' + page + '/' + limit).pipe(
      retry(1),
      catchError(this.handleError)

    );
  }

  getTestsAll(page, limit, obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(environment.apiUrl + '/tests/get-all-front/' + page + '/' + limit, obj, { headers: headers}).pipe(
      retry(1),
      catchError(this.handleError)

    );
  }


  order(obj) {
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
    return this.http.post(environment.apiUrl + '/add/add', obj, { headers: headers}).pipe(
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
