import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() Navigate = new EventEmitter();
  private isLoggedIn: boolean;
  private openMenu: boolean;

  constructor(private router: Router,
              private sharedService: SharedService) {
    sharedService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }
  ngOnInit() {
    this.openMenu = false;
    this.sharedService.currentUser().subscribe( (res: any) => {
      if (!res.error && res.user && res.user !== null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  navigateTo(element: string) {
    this.router.navigateByUrl('/home', { state: {id: element} });
    this.Navigate.emit(element);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
