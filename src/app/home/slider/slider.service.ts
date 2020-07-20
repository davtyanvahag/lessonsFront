import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import { OwlOptions } from 'ngx-owl-carousel-o';

import {environment} from '../../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(private http: HttpClient) {
    console.log();
  }

  get() {
    return this.http.get(environment.apiUrl + '/sliders/get-user-side').pipe(
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
