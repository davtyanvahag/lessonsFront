import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) {
    console.log();
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
