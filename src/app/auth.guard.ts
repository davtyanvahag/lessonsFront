import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, first } from 'rxjs/operators';
import {SharedService} from './shared/shared.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  headers: any;
  ROOT_URL: string;
  constructor(private router: Router,
              private sharedService: SharedService,
              private http: HttpClient) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      const token = localStorage.getItem('token');
      this.headers = new HttpHeaders({'Content-Type': 'application/json', 'token': token});
      console.log(this.headers);
      return this.http.get(`${environment.apiUrl}`  + '/users/getCurrentUser', { headers: this.headers }).pipe(
        first(),
        map((res: any) => {
            if (res.error) {
              console.log('DUS QCII')
              localStorage.removeItem('token');
              this.sharedService.loggedInStatus(false);
              this.router.navigate(['/sign-in']);
              return false;
            } else {
              console.log('aaaa');
              this.sharedService.loggedInStatus(true);
              return true;
            }
        }));
    } else {
      console.log('res4 :::');
      this.sharedService.loggedInStatus(false);
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
