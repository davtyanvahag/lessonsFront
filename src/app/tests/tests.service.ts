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
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'token': localStorage.getItem('token')});
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
